import CharacterHeader from './CharacterHeader';

const CharacterRelation = {"type":"object","description":"Relation between characters","properties":{"type":{"type":"string","description":"Relation type"},"source":CharacterHeader,"target":CharacterHeader},"title":"CharacterRelation","x-readme-ref-name":"CharacterRelation"} as const
;
export default CharacterRelation
