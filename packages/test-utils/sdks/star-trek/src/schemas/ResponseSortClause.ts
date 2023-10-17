import ResponseSortDirection from './ResponseSortDirection';

const ResponseSortClause = {"type":"object","description":"Single response sort clause","properties":{"name":{"type":"string","description":"Field name results are sorted by"},"direction":ResponseSortDirection,"clauseOrder":{"type":"integer","description":"Order in which this clause was applied"}},"required":["name","direction","clauseOrder"],"title":"ResponseSortClause","x-readme-ref-name":"ResponseSortClause"} as const
;
export default ResponseSortClause
