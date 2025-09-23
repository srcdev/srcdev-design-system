---
title: "About us"
description: "Welcome to our site"
bodyClass: "about-us-page"
---

::layout-row{tag=div variant=inset-content style-class-passthrough=mb-20}

  :header-block{tag-level=2 class-level=2}[Display Prompt Example]

  ::display-prompt-core{theme="success" :dismissible="true" :use-local-style-overrides="true" :style-class-passthrough="['your-scope-class']"}
  #customDecoratorIcon
  :icon{name="akar-icons:info" class="icon"}

  #title
  :raw-text[Success Prompt Title with content (Dismissable)]

  #layout-content
  :raw-text[This is prompt content, it can contain html or plain text.]

  #custom-close-icon
  :icon{name="material-symbols:close-small" class="icon"}

  #custom-title
  :raw-text[Dismiss]
  ::

::

::layout-row{tag=div variant=popout style-class-passthrough=mb-20}

:header-block{tag-level=2 class-level=2}[Example Layout Grid B]

::layout-grid-b{:top-row-slot1-item-count="6" :bottom-row-item-count="4" :style-class-passthrough="['canvas-name']"}
#top-row-slot1-1-content
<p class="p-24">This is content slot 1</p>

#top-row-slot1-2-content
<p class="p-24">This is content slot 2</p>

#top-row-slot1-3-content
<p class="p-24">This is content slot 3</p>

#top-row-slot1-4-content
<p class="p-24">This is content slot 4</p>

#top-row-slot1-5-content
<p class="p-24">This is content slot 5</p>

#top-row-slot1-6-content
<p class="p-24">This is content slot 6</p>

#top-row-slot-2
:header-block{tag-level=3 class-level=3}[Top row slot 2]

<p class="page-body-normal">Lorem ipsum odor amet, consectetuer adipiscing elit. Nec elementum maecenas placerat laoreet curae elit convallis himenaeos. Tellus varius cursus convallis commodo suspendisse litora. Platea accumsan interdum ultrices adipiscing molestie cras dui. Vehicula egestas nisi sagittis fames metus velit. Sodales blandit nisi eu dis sit, ridiculus aliquam. Morbi tellus eu in penatibus torquent tortor. Platea gravida nam; egestas enim nostra ultricies.</p>

<p class="page-body-normal">Mi nibh quisque taciti porta curabitur nostra volutpat. Habitant sodales arcu habitasse mi duis conubia leo lacinia. Montes torquent sodales adipiscing; proin semper feugiat morbi ullamcorper praesent. Arcu luctus tempor quam ligula vestibulum sapien faucibus ridiculus. Cursus consequat ultricies consectetur class suscipit quisque convallis eget? Dignissim mattis luctus enim habitant porta pretium litora. Parturient montes imperdiet massa; sollicitudin varius hac aptent. Eleifend parturient mattis tellus nisi a montes.</p>

#top-row-slot-3
:header-block{tag-level=3 class-level=3}[Top row slot 3]

<p class="page-body-normal">Lorem ipsum odor amet, consectetuer adipiscing elit. Nec elementum maecenas placerat laoreet curae elit convallis himenaeos. Tellus varius cursus convallis commodo suspendisse litora. Platea accumsan interdum ultrices adipiscing molestie cras dui. Vehicula egestas nisi sagittis fames metus velit. Sodales blandit nisi eu dis sit, ridiculus aliquam. Morbi tellus eu in penatibus torquent tortor. Platea gravida nam; egestas enim nostra ultricies.</p>

<p class="page-body-normal">Mi nibh quisque taciti porta curabitur nostra volutpat. Habitant sodales arcu habitasse mi duis conubia leo lacinia. Montes torquent sodales adipiscing; proin semper feugiat morbi ullamcorper praesent. Arcu luctus tempor quam ligula vestibulum sapien faucibus ridiculus. Cursus consequat ultricies consectetur class suscipit quisque convallis eget? Dignissim mattis luctus enim habitant porta pretium litora. Parturient montes imperdiet massa; sollicitudin varius hac aptent. Eleifend parturient mattis tellus nisi a montes.</p>

#bottom-row-1-content
:header-block{tag-level=3 class-level=3}[This is content slot 1]

<p class="page-body-normal">Lorem ipsum odor amet, consectetuer adipiscing elit. Nec elementum maecenas placerat laoreet curae elit convallis himenaeos. Tellus varius cursus convallis commodo suspendisse litora. Platea accumsan interdum ultrices adipiscing molestie cras dui. Vehicula egestas nisi sagittis fames metus velit. Sodales blandit nisi eu dis sit, ridiculus aliquam. Morbi tellus eu in penatibus torquent tortor. Platea gravida nam; egestas enim nostra ultricies.</p>

#bottom-row-2-content
:header-block{tag-level=3 class-level=3}[This is content slot 2]

<p class="page-body-normal">Lorem ipsum odor amet, consectetuer adipiscing elit. Nec elementum maecenas placerat laoreet curae elit convallis himenaeos. Tellus varius cursus convallis commodo suspendisse litora. Platea accumsan interdum ultrices adipiscing molestie cras dui. Vehicula egestas nisi sagittis fames metus velit. Sodales blandit nisi eu dis sit, ridiculus aliquam. Morbi tellus eu in penatibus torquent tortor. Platea gravida nam; egestas enim nostra ultricies.</p>

#bottom-row-3-content
:header-block{tag-level=3 class-level=3}[This is content slot 3]

<p class="page-body-normal">Lorem ipsum odor amet, consectetuer adipiscing elit. Nec elementum maecenas placerat laoreet curae elit convallis himenaeos. Tellus varius cursus convallis commodo suspendisse litora. Platea accumsan interdum ultrices adipiscing molestie cras dui. Vehicula egestas nisi sagittis fames metus velit. Sodales blandit nisi eu dis sit, ridiculus aliquam. Morbi tellus eu in penatibus torquent tortor. Platea gravida nam; egestas enim nostra ultricies.</p>

#bottom-row-4-content
:header-block{tag-level=3 class-level=3}[This is content slot 4]

<p class="page-body-normal">Lorem ipsum odor amet, consectetuer adipiscing elit. Nec elementum maecenas placerat laoreet curae elit convallis himenaeos. Tellus varius cursus convallis commodo suspendisse litora. Platea accumsan interdum ultrices adipiscing molestie cras dui. Vehicula egestas nisi sagittis fames metus velit. Sodales blandit nisi eu dis sit, ridiculus aliquam. Morbi tellus eu in penatibus torquent tortor. Platea gravida nam; egestas enim nostra ultricies.</p>

::

::

::layout-row{tag=div variant=inset-content style-class-passthrough=mb-20}

  :header-block{tag-level=2 class-level=2}[Example Nuxt Link]

  :markdown-nuxt-link{to=/ style-class-passthrough=page-link-normal}[Back to home]

::
