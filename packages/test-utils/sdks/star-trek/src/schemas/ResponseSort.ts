import ResponseSortClause from './ResponseSortClause';

const ResponseSort = {"type":"object","description":"Response sort","properties":{"clauses":{"type":"array","description":"List of response sort rules","items":ResponseSortClause}},"title":"ResponseSort","x-readme-ref-name":"ResponseSort"} as const
;
export default ResponseSort
