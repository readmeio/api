const Category = {"type":"object","title":"category","x-readme-ref-name":"category","required":["title"],"properties":{"title":{"type":"string","description":"A short title for the category. This is what will show in the sidebar."},"type":{"type":"string","enum":["reference","guide"],"default":"guide","description":"A category can be part of your reference or guide documentation, which is determined by this field.\n\nDefault: `guide`"}}} as const
;
export default Category
