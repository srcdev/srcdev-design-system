#!/usr/bin/env node

import { readdir, readFile, writeFile, watch } from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const sourceDir = join(__dirname, "../i18n-source/locales")
const outputDir = join(__dirname, "../i18n/locales")
const componentsDir = join(__dirname, "../app/components")

console.log("Building i18n JSON files...")

// Read locales from nuxt.config.ts
async function getLocalesFromConfig() {
  try {
    const configPath = join(__dirname, "../nuxt.config.ts")
    const configContent = await readFile(configPath, "utf8")

    // Extract locales from the i18n config using regex
    const localesMatch = configContent.match(/locales:\s*\[([\s\S]*?)\]/)
    if (!localesMatch) {
      throw new Error("Could not find locales in nuxt.config.ts")
    }

    // Extract language codes from the locale objects
    const languageMatches = localesMatch[1].matchAll(/language:\s*"([^"]+)"/g)
    const locales = Array.from(languageMatches, (match) => match[1])

    if (locales.length === 0) {
      throw new Error("No locales found in nuxt.config.ts")
    }

    return locales
  } catch (error) {
    console.warn("⚠️ Could not read locales from nuxt.config.ts:", error.message)
    console.warn("📋 Falling back to default locales")
    return ["en-GB", "zh-CN", "ar-YE"] // Fallback
  }
}

// Helper function to deep merge objects
function deepMerge(target, source) {
  const result = { ...target }

  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }

  return result
}

// Function to find component locale directories
async function findComponentLocaleDirs() {
  const componentLocaleDirs = []

  try {
    const componentEntries = await readdir(componentsDir, { withFileTypes: true })

    for (const entry of componentEntries) {
      if (entry.isDirectory()) {
        const componentPath = join(componentsDir, entry.name)
        const localesPath = join(componentPath, "locales")

        try {
          // Check if locales directory exists
          const localesEntries = await readdir(localesPath, { withFileTypes: true })
          if (localesEntries.length > 0) {
            componentLocaleDirs.push(localesPath)
          }
        } catch {
          // locales directory doesn't exist, skip
        }
      }
    }
  } catch (error) {
    console.warn("⚠️ Could not scan components directory:", error.message)
  }

  return componentLocaleDirs
}

// Function to recursively find JSON files for a locale
async function findLocaleFiles(locale) {
  const files = []

  // Get component locale directories
  const componentLocaleDirs = await findComponentLocaleDirs()
  const allDirs = [sourceDir, ...componentLocaleDirs]

  async function searchDir(currentDir) {
    try {
      const entries = await readdir(currentDir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = join(currentDir, entry.name)

        if (entry.isDirectory()) {
          await searchDir(fullPath)
        } else if (entry.isFile() && entry.name === `${locale}.json`) {
          files.push(fullPath)
        }
      }
    } catch {
      // Ignore errors (e.g., permission issues)
    }
  }

  for (const dir of allDirs) {
    await searchDir(dir)
  }

  return files
}

// Function to generate a merged locale file
async function generateMergedLocale(locale) {
  const files = await findLocaleFiles(locale)
  let mergedTranslations = {}

  for (const filePath of files) {
    try {
      const content = await readFile(filePath, "utf8")
      const json = JSON.parse(content)
      mergedTranslations = deepMerge(mergedTranslations, json)
    } catch (error) {
      console.warn(`⚠️  Failed to read ${filePath}:`, error.message)
    }
  }

  return mergedTranslations
}

// Generate JSON file content
function generateJsonFile(locale, translations) {
  return JSON.stringify(translations, null, 2)
}

async function generateLocaleFiles() {
  console.log("🌍 Generating i18n JSON locale files...")

  // Get component locale directories and log them
  const componentLocaleDirs = await findComponentLocaleDirs()
  if (componentLocaleDirs.length > 0) {
    console.log(`📁 Found component locale directories:`)
    componentLocaleDirs.forEach((dir) => {
      const relativePath = dir.replace(join(__dirname, ".."), "")
      console.log(`   ${relativePath}`)
    })
  }

  // Get locales from nuxt.config.ts
  const locales = await getLocalesFromConfig()
  console.log(`📋 Found locales: ${locales.join(", ")}`)

  for (const locale of locales) {
    try {
      const translations = await generateMergedLocale(locale)
      const content = generateJsonFile(locale, translations)
      const filePath = join(outputDir, `${locale}.json`)

      await writeFile(filePath, content, "utf8")
      console.log(`✅ Generated ${locale}.json`)
    } catch (error) {
      console.error(`❌ Failed to generate ${locale}.json:`, error)
    }
  }

  console.log("🎉 i18n JSON locale files generated successfully!")
}

// Watch mode function
async function watchAndBuild() {
  console.log("👀 Watching i18n files for changes...")

  // Generate initial files
  await generateLocaleFiles()

  // Get component locale directories for watching
  const componentLocaleDirs = await findComponentLocaleDirs()
  const allWatchDirs = [sourceDir, ...componentLocaleDirs]

  try {
    // Create watchers for all directories
    const watchers = allWatchDirs.map((dir) => watch(dir, { recursive: true }))

    // Handle changes from any watcher
    const handleChange = async (event) => {
      if (event.filename && event.filename.endsWith(".json")) {
        console.log(`\n📝 Detected change in ${event.filename}`)
        await generateLocaleFiles()
      }
    }

    // Listen to all watchers
    for (const watcher of watchers) {
      ;(async () => {
        for await (const event of watcher) {
          await handleChange(event)
        }
      })().catch((error) => {
        if (error.code !== "ABORT_ERR") {
          console.error("❌ Watch error:", error)
        }
      })
    }

    // Keep the process alive
    await new Promise(() => {})
  } catch (error) {
    if (error.code !== "ABORT_ERR") {
      console.error("❌ Watch error:", error)
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const watchMode = args.includes("--watch") || args.includes("-w")

// Run if this file is executed directly
// Mac
if (import.meta.url === `file://${process.argv[1]}`) {
  if (watchMode) {
    watchAndBuild().catch(console.error)
  } else {
    generateLocaleFiles().catch(console.error)
  }
}
// Fix for Windows: normalize paths for proper comparison
/*
const currentFileUrl = import.meta.url
const executedFileUrl = `file:///${process.argv[1].replace(/\\/g, "/")}`
if (currentFileUrl === executedFileUrl) {
  if (watchMode) {
    watchAndBuild().catch(console.error)
  } else {
    generateLocaleFiles().catch(console.error)
  }
}
*/
export { generateLocaleFiles }
