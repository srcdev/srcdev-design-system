import data from '../data/visitor-source.json';

export default defineEventHandler(async event => {
  return data;
});
