import type * as types from './types.js';
import type { ConfigOptions, FetchResponse } from '@readme/api-core/types';
import APICore from '@readme/api-core';
import definition from '@readme/oas-examples/3.0/json/star-trek.json';

export default class SDK {
  core: APICore;

  constructor() {
    this.core = new APICore(definition, 'star-trek/1.0.0 (api/7.0.0-mock)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Retrival of a single animal
   *
   */
  getAnimal(metadata: types.GetAnimalMetadataParam): Promise<FetchResponse<200, types.AnimalFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/animal', 'get', metadata);
  }

  /**
   * Pagination over animals
   *
   */
  getAnimalSearch(metadata?: types.GetAnimalSearchMetadataParam): Promise<FetchResponse<200, types.AnimalBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/animal/search', 'get', metadata);
  }

  /**
   * Searching animals
   *
   */
  postAnimalSearch(body?: types.PostAnimalSearchFormDataParam, metadata?: types.PostAnimalSearchMetadataParam): Promise<FetchResponse<200, types.AnimalBaseResponse>> {
    return this.core.fetch('/animal/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single astronomical object
   *
   */
  getAstronomicalobject(metadata: types.GetAstronomicalobjectMetadataParam): Promise<FetchResponse<200, types.AstronomicalObjectFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/astronomicalObject', 'get', metadata);
  }

  /**
   * Pagination over astronomical objects
   *
   */
  getAstronomicalobjectSearch(metadata?: types.GetAstronomicalobjectSearchMetadataParam): Promise<FetchResponse<200, types.AstronomicalObjectBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/astronomicalObject/search', 'get', metadata);
  }

  /**
   * Searching astronomical objects
   *
   */
  postAstronomicalobjectSearch(body?: types.PostAstronomicalobjectSearchFormDataParam, metadata?: types.PostAstronomicalobjectSearchMetadataParam): Promise<FetchResponse<200, types.AstronomicalObjectBaseResponse>> {
    return this.core.fetch('/astronomicalObject/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single book
   *
   */
  getBook(metadata: types.GetBookMetadataParam): Promise<FetchResponse<200, types.BookFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/book', 'get', metadata);
  }

  /**
   * Pagination over books
   *
   */
  getBookSearch(metadata?: types.GetBookSearchMetadataParam): Promise<FetchResponse<200, types.BookBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/book/search', 'get', metadata);
  }

  /**
   * Searching books
   *
   */
  postBookSearch(body?: types.PostBookSearchFormDataParam, metadata?: types.PostBookSearchMetadataParam): Promise<FetchResponse<200, types.BookBaseResponse>> {
    return this.core.fetch('/book/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single book collection
   *
   */
  getBookcollection(metadata: types.GetBookcollectionMetadataParam): Promise<FetchResponse<200, types.BookCollectionFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/bookCollection', 'get', metadata);
  }

  /**
   * Pagination over book collections
   *
   */
  getBookcollectionSearch(metadata?: types.GetBookcollectionSearchMetadataParam): Promise<FetchResponse<200, types.BookCollectionBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/bookCollection/search', 'get', metadata);
  }

  /**
   * Searching book collections
   *
   */
  postBookcollectionSearch(body?: types.PostBookcollectionSearchFormDataParam, metadata?: types.PostBookcollectionSearchMetadataParam): Promise<FetchResponse<200, types.BookCollectionBaseResponse>> {
    return this.core.fetch('/bookCollection/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single book series
   *
   */
  getBookseries(metadata: types.GetBookseriesMetadataParam): Promise<FetchResponse<200, types.BookSeriesFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/bookSeries', 'get', metadata);
  }

  /**
   * Pagination over book series
   *
   */
  getBookseriesSearch(metadata?: types.GetBookseriesSearchMetadataParam): Promise<FetchResponse<200, types.BookSeriesBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/bookSeries/search', 'get', metadata);
  }

  /**
   * Searching book series
   *
   */
  postBookseriesSearch(body?: types.PostBookseriesSearchFormDataParam, metadata?: types.PostBookseriesSearchMetadataParam): Promise<FetchResponse<200, types.BookSeriesBaseResponse>> {
    return this.core.fetch('/bookSeries/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single character
   *
   */
  getCharacter(metadata: types.GetCharacterMetadataParam): Promise<FetchResponse<200, types.CharacterFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/character', 'get', metadata);
  }

  /**
   * Pagination over characters
   *
   */
  getCharacterSearch(metadata?: types.GetCharacterSearchMetadataParam): Promise<FetchResponse<200, types.CharacterBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/character/search', 'get', metadata);
  }

  /**
   * Searching characters
   *
   */
  postCharacterSearch(body?: types.PostCharacterSearchFormDataParam, metadata?: types.PostCharacterSearchMetadataParam): Promise<FetchResponse<200, types.CharacterBaseResponse>> {
    return this.core.fetch('/character/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single comics
   *
   */
  getComics(metadata: types.GetComicsMetadataParam): Promise<FetchResponse<200, types.ComicsFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comics', 'get', metadata);
  }

  /**
   * Pagination over comics
   *
   */
  getComicsSearch(metadata?: types.GetComicsSearchMetadataParam): Promise<FetchResponse<200, types.ComicsBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comics/search', 'get', metadata);
  }

  /**
   * Searching comics
   *
   */
  postComicsSearch(body?: types.PostComicsSearchFormDataParam, metadata?: types.PostComicsSearchMetadataParam): Promise<FetchResponse<200, types.ComicsBaseResponse>> {
    return this.core.fetch('/comics/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single comic collection
   *
   */
  getComiccollection(metadata: types.GetComiccollectionMetadataParam): Promise<FetchResponse<200, types.ComicCollectionFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comicCollection', 'get', metadata);
  }

  /**
   * Pagination over comic collections
   *
   */
  getComiccollectionSearch(metadata?: types.GetComiccollectionSearchMetadataParam): Promise<FetchResponse<200, types.ComicCollectionBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comicCollection/search', 'get', metadata);
  }

  /**
   * Searching comic collections
   *
   */
  postComiccollectionSearch(body?: types.PostComiccollectionSearchFormDataParam, metadata?: types.PostComiccollectionSearchMetadataParam): Promise<FetchResponse<200, types.ComicCollectionBaseResponse>> {
    return this.core.fetch('/comicCollection/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single comic series
   *
   */
  getComicseries(metadata: types.GetComicseriesMetadataParam): Promise<FetchResponse<200, types.ComicSeriesFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comicSeries', 'get', metadata);
  }

  /**
   * Pagination over comic series
   *
   */
  getComicseriesSearch(metadata?: types.GetComicseriesSearchMetadataParam): Promise<FetchResponse<200, types.ComicSeriesBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comicSeries/search', 'get', metadata);
  }

  /**
   * Searching comic series
   *
   */
  postComicseriesSearch(body?: types.PostComicseriesSearchFormDataParam, metadata?: types.PostComicseriesSearchMetadataParam): Promise<FetchResponse<200, types.ComicSeriesBaseResponse>> {
    return this.core.fetch('/comicSeries/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single comic strip
   *
   */
  getComicstrip(metadata: types.GetComicstripMetadataParam): Promise<FetchResponse<200, types.ComicStripFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comicStrip', 'get', metadata);
  }

  /**
   * Pagination over comic strips
   *
   */
  getComicstripSearch(metadata?: types.GetComicstripSearchMetadataParam): Promise<FetchResponse<200, types.ComicStripBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/comicStrip/search', 'get', metadata);
  }

  /**
   * Searching comic strips
   *
   */
  postComicstripSearch(body?: types.PostComicstripSearchFormDataParam, metadata?: types.PostComicstripSearchMetadataParam): Promise<FetchResponse<200, types.ComicStripBaseResponse>> {
    return this.core.fetch('/comicStrip/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single company
   *
   */
  getCompany(metadata: types.GetCompanyMetadataParam): Promise<FetchResponse<200, types.CompanyFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/company', 'get', metadata);
  }

  /**
   * Pagination over companies
   *
   */
  getCompanySearch(metadata?: types.GetCompanySearchMetadataParam): Promise<FetchResponse<200, types.CompanyBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/company/search', 'get', metadata);
  }

  /**
   * Searching companies
   *
   */
  postCompanySearch(body?: types.PostCompanySearchFormDataParam, metadata?: types.PostCompanySearchMetadataParam): Promise<FetchResponse<200, types.CompanyBaseResponse>> {
    return this.core.fetch('/company/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single conflict
   *
   */
  getConflict(metadata: types.GetConflictMetadataParam): Promise<FetchResponse<200, types.ConflictFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/conflict', 'get', metadata);
  }

  /**
   * Pagination over conflicts
   *
   */
  getConflictSearch(metadata?: types.GetConflictSearchMetadataParam): Promise<FetchResponse<200, types.ConflictBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/conflict/search', 'get', metadata);
  }

  /**
   * Searching conflicts
   *
   */
  postConflictSearch(body?: types.PostConflictSearchFormDataParam, metadata?: types.PostConflictSearchMetadataParam): Promise<FetchResponse<200, types.ConflictBaseResponse>> {
    return this.core.fetch('/conflict/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single element
   *
   */
  getElement(metadata: types.GetElementMetadataParam): Promise<FetchResponse<200, types.ElementFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/element', 'get', metadata);
  }

  /**
   * Pagination over elements
   *
   */
  getElementSearch(metadata?: types.GetElementSearchMetadataParam): Promise<FetchResponse<200, types.ElementBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/element/search', 'get', metadata);
  }

  /**
   * Searching elements
   *
   */
  postElementSearch(body?: types.PostElementSearchFormDataParam, metadata?: types.PostElementSearchMetadataParam): Promise<FetchResponse<200, types.ElementBaseResponse>> {
    return this.core.fetch('/element/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single episode
   *
   */
  getEpisode(metadata: types.GetEpisodeMetadataParam): Promise<FetchResponse<200, types.EpisodeFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/episode', 'get', metadata);
  }

  /**
   * Pagination over episodes
   *
   */
  getEpisodeSearch(metadata?: types.GetEpisodeSearchMetadataParam): Promise<FetchResponse<200, types.EpisodeBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/episode/search', 'get', metadata);
  }

  /**
   * Searching episodes
   *
   */
  postEpisodeSearch(body?: types.PostEpisodeSearchFormDataParam, metadata?: types.PostEpisodeSearchMetadataParam): Promise<FetchResponse<200, types.EpisodeBaseResponse>> {
    return this.core.fetch('/episode/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single food
   *
   */
  getFood(metadata: types.GetFoodMetadataParam): Promise<FetchResponse<200, types.FoodFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/food', 'get', metadata);
  }

  /**
   * Pagination over foods
   *
   */
  getFoodSearch(metadata?: types.GetFoodSearchMetadataParam): Promise<FetchResponse<200, types.FoodBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/food/search', 'get', metadata);
  }

  /**
   * Searching foods
   *
   */
  postFoodSearch(body?: types.PostFoodSearchFormDataParam, metadata?: types.PostFoodSearchMetadataParam): Promise<FetchResponse<200, types.FoodBaseResponse>> {
    return this.core.fetch('/food/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single literature
   *
   */
  getLiterature(metadata: types.GetLiteratureMetadataParam): Promise<FetchResponse<200, types.LiteratureFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/literature', 'get', metadata);
  }

  /**
   * Pagination over literature
   *
   */
  getLiteratureSearch(metadata?: types.GetLiteratureSearchMetadataParam): Promise<FetchResponse<200, types.LiteratureBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/literature/search', 'get', metadata);
  }

  /**
   * Searching literature
   *
   */
  postLiteratureSearch(body?: types.PostLiteratureSearchFormDataParam, metadata?: types.PostLiteratureSearchMetadataParam): Promise<FetchResponse<200, types.LiteratureBaseResponse>> {
    return this.core.fetch('/literature/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single location
   *
   */
  getLocation(metadata: types.GetLocationMetadataParam): Promise<FetchResponse<200, types.LocationFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/location', 'get', metadata);
  }

  /**
   * Pagination over locations
   *
   */
  getLocationSearch(metadata?: types.GetLocationSearchMetadataParam): Promise<FetchResponse<200, types.LocationBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/location/search', 'get', metadata);
  }

  /**
   * Searching locations
   *
   */
  postLocationSearch(body?: types.PostLocationSearchFormDataParam, metadata?: types.PostLocationSearchMetadataParam): Promise<FetchResponse<200, types.LocationBaseResponse>> {
    return this.core.fetch('/location/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single magazine
   *
   */
  getMagazine(metadata: types.GetMagazineMetadataParam): Promise<FetchResponse<200, types.MagazineFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/magazine', 'get', metadata);
  }

  /**
   * Pagination over magazines
   *
   */
  getMagazineSearch(metadata?: types.GetMagazineSearchMetadataParam): Promise<FetchResponse<200, types.MagazineBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/magazine/search', 'get', metadata);
  }

  /**
   * Searching magazines
   *
   */
  postMagazineSearch(body?: types.PostMagazineSearchFormDataParam, metadata?: types.PostMagazineSearchMetadataParam): Promise<FetchResponse<200, types.MagazineBaseResponse>> {
    return this.core.fetch('/magazine/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single magazine series
   *
   */
  getMagazineseries(metadata: types.GetMagazineseriesMetadataParam): Promise<FetchResponse<200, types.MagazineSeriesFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/magazineSeries', 'get', metadata);
  }

  /**
   * Pagination over magazine series
   *
   */
  getMagazineseriesSearch(metadata?: types.GetMagazineseriesSearchMetadataParam): Promise<FetchResponse<200, types.MagazineSeriesBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/magazineSeries/search', 'get', metadata);
  }

  /**
   * Searching magazine series
   *
   */
  postMagazineseriesSearch(body?: types.PostMagazineseriesSearchFormDataParam, metadata?: types.PostMagazineseriesSearchMetadataParam): Promise<FetchResponse<200, types.MagazineSeriesBaseResponse>> {
    return this.core.fetch('/magazineSeries/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single material
   *
   */
  getMaterial(metadata: types.GetMaterialMetadataParam): Promise<FetchResponse<200, types.MaterialFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/material', 'get', metadata);
  }

  /**
   * Pagination over materials
   *
   */
  getMaterialSearch(metadata?: types.GetMaterialSearchMetadataParam): Promise<FetchResponse<200, types.MaterialBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/material/search', 'get', metadata);
  }

  /**
   * Searching materials
   *
   */
  postMaterialSearch(body?: types.PostMaterialSearchFormDataParam, metadata?: types.PostMaterialSearchMetadataParam): Promise<FetchResponse<200, types.MaterialBaseResponse>> {
    return this.core.fetch('/material/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single medical condition
   *
   */
  getMedicalcondition(metadata: types.GetMedicalconditionMetadataParam): Promise<FetchResponse<200, types.MedicalConditionFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/medicalCondition', 'get', metadata);
  }

  /**
   * Pagination over medical conditions
   *
   */
  getMedicalconditionSearch(metadata?: types.GetMedicalconditionSearchMetadataParam): Promise<FetchResponse<200, types.MedicalConditionBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/medicalCondition/search', 'get', metadata);
  }

  /**
   * Searching medical conditions
   *
   */
  postMedicalconditionSearch(body?: types.PostMedicalconditionSearchFormDataParam, metadata?: types.PostMedicalconditionSearchMetadataParam): Promise<FetchResponse<200, types.MedicalConditionBaseResponse>> {
    return this.core.fetch('/medicalCondition/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single movie
   *
   */
  getMovie(metadata: types.GetMovieMetadataParam): Promise<FetchResponse<200, types.MovieFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/movie', 'get', metadata);
  }

  /**
   * Pagination over movies
   *
   */
  getMovieSearch(metadata?: types.GetMovieSearchMetadataParam): Promise<FetchResponse<200, types.MovieBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/movie/search', 'get', metadata);
  }

  /**
   * Searching movies
   *
   */
  postMovieSearch(body?: types.PostMovieSearchFormDataParam, metadata?: types.PostMovieSearchMetadataParam): Promise<FetchResponse<200, types.MovieBaseResponse>> {
    return this.core.fetch('/movie/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single occupation
   *
   */
  getOccupation(metadata: types.GetOccupationMetadataParam): Promise<FetchResponse<200, types.OccupationFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/occupation', 'get', metadata);
  }

  /**
   * Pagination over occupations
   *
   */
  getOccupationSearch(metadata?: types.GetOccupationSearchMetadataParam): Promise<FetchResponse<200, types.OccupationBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/occupation/search', 'get', metadata);
  }

  /**
   * Searching occupations
   *
   */
  postOccupationSearch(body?: types.PostOccupationSearchFormDataParam, metadata?: types.PostOccupationSearchMetadataParam): Promise<FetchResponse<200, types.OccupationBaseResponse>> {
    return this.core.fetch('/occupation/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single organization
   *
   */
  getOrganization(metadata: types.GetOrganizationMetadataParam): Promise<FetchResponse<200, types.OrganizationFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/organization', 'get', metadata);
  }

  /**
   * Pagination over organizations
   *
   */
  getOrganizationSearch(metadata?: types.GetOrganizationSearchMetadataParam): Promise<FetchResponse<200, types.OrganizationBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/organization/search', 'get', metadata);
  }

  /**
   * Searching organizations
   *
   */
  postOrganizationSearch(body?: types.PostOrganizationSearchFormDataParam, metadata?: types.PostOrganizationSearchMetadataParam): Promise<FetchResponse<200, types.OrganizationBaseResponse>> {
    return this.core.fetch('/organization/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single performer
   *
   */
  getPerformer(metadata: types.GetPerformerMetadataParam): Promise<FetchResponse<200, types.PerformerFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/performer', 'get', metadata);
  }

  /**
   * Pagination over performers
   *
   */
  getPerformerSearch(metadata?: types.GetPerformerSearchMetadataParam): Promise<FetchResponse<200, types.PerformerBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/performer/search', 'get', metadata);
  }

  /**
   * Searching performers
   *
   */
  postPerformerSearch(body?: types.PostPerformerSearchFormDataParam, metadata?: types.PostPerformerSearchMetadataParam): Promise<FetchResponse<200, types.PerformerBaseResponse>> {
    return this.core.fetch('/performer/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single season
   *
   */
  getSeason(metadata: types.GetSeasonMetadataParam): Promise<FetchResponse<200, types.SeasonFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/season', 'get', metadata);
  }

  /**
   * Pagination over seasons
   *
   */
  getSeasonSearch(metadata?: types.GetSeasonSearchMetadataParam): Promise<FetchResponse<200, types.SeasonBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/season/search', 'get', metadata);
  }

  /**
   * Searching seasons
   *
   */
  postSeasonSearch(body?: types.PostSeasonSearchFormDataParam, metadata?: types.PostSeasonSearchMetadataParam): Promise<FetchResponse<200, types.SeasonBaseResponse>> {
    return this.core.fetch('/season/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single series
   *
   */
  getSeries(metadata: types.GetSeriesMetadataParam): Promise<FetchResponse<200, types.SeriesFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/series', 'get', metadata);
  }

  /**
   * Pagination over series
   *
   */
  getSeriesSearch(metadata?: types.GetSeriesSearchMetadataParam): Promise<FetchResponse<200, types.SeriesBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/series/search', 'get', metadata);
  }

  /**
   * Searching series
   *
   */
  postSeriesSearch(body?: types.PostSeriesSearchFormDataParam, metadata?: types.PostSeriesSearchMetadataParam): Promise<FetchResponse<200, types.SeriesBaseResponse>> {
    return this.core.fetch('/series/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single soundtrack
   *
   */
  getSoundtrack(metadata: types.GetSoundtrackMetadataParam): Promise<FetchResponse<200, types.SoundtrackFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/soundtrack', 'get', metadata);
  }

  /**
   * Pagination over soundtracks
   *
   */
  getSoundtrackSearch(metadata?: types.GetSoundtrackSearchMetadataParam): Promise<FetchResponse<200, types.SoundtrackBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/soundtrack/search', 'get', metadata);
  }

  /**
   * Searching soundtracks
   *
   */
  postSoundtrackSearch(body?: types.PostSoundtrackSearchFormDataParam, metadata?: types.PostSoundtrackSearchMetadataParam): Promise<FetchResponse<200, types.SoundtrackBaseResponse>> {
    return this.core.fetch('/soundtrack/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single spacecraft
   *
   */
  getSpacecraft(metadata: types.GetSpacecraftMetadataParam): Promise<FetchResponse<200, types.SpacecraftFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/spacecraft', 'get', metadata);
  }

  /**
   * Pagination over spacecrafts
   *
   */
  getSpacecraftSearch(metadata?: types.GetSpacecraftSearchMetadataParam): Promise<FetchResponse<200, types.SpacecraftBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/spacecraft/search', 'get', metadata);
  }

  /**
   * Searching spacecrafts
   *
   */
  postSpacecraftSearch(body?: types.PostSpacecraftSearchFormDataParam, metadata?: types.PostSpacecraftSearchMetadataParam): Promise<FetchResponse<200, types.SpacecraftBaseResponse>> {
    return this.core.fetch('/spacecraft/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single spacecraft class
   *
   */
  getSpacecraftclass(metadata: types.GetSpacecraftclassMetadataParam): Promise<FetchResponse<200, types.SpacecraftClassFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/spacecraftClass', 'get', metadata);
  }

  /**
   * Pagination over spacecraft classes
   *
   */
  getSpacecraftclassSearch(metadata?: types.GetSpacecraftclassSearchMetadataParam): Promise<FetchResponse<200, types.SpacecraftClassBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/spacecraftClass/search', 'get', metadata);
  }

  /**
   * Searching spacecraft classes
   *
   */
  postSpacecraftclassSearch(body?: types.PostSpacecraftclassSearchFormDataParam, metadata?: types.PostSpacecraftclassSearchMetadataParam): Promise<FetchResponse<200, types.SpacecraftClassBaseResponse>> {
    return this.core.fetch('/spacecraftClass/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single species
   *
   */
  getSpecies(metadata: types.GetSpeciesMetadataParam): Promise<FetchResponse<200, types.SpeciesFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/species', 'get', metadata);
  }

  /**
   * Pagination over species
   *
   */
  getSpeciesSearch(metadata?: types.GetSpeciesSearchMetadataParam): Promise<FetchResponse<200, types.SpeciesBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/species/search', 'get', metadata);
  }

  /**
   * Searching species
   *
   */
  postSpeciesSearch(body?: types.PostSpeciesSearchFormDataParam, metadata?: types.PostSpeciesSearchMetadataParam): Promise<FetchResponse<200, types.SpeciesBaseResponse>> {
    return this.core.fetch('/species/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single staff
   *
   */
  getStaff(metadata: types.GetStaffMetadataParam): Promise<FetchResponse<200, types.StaffFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/staff', 'get', metadata);
  }

  /**
   * Pagination over staff
   *
   */
  getStaffSearch(metadata?: types.GetStaffSearchMetadataParam): Promise<FetchResponse<200, types.StaffBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/staff/search', 'get', metadata);
  }

  /**
   * Searching staff
   *
   */
  postStaffSearch(body?: types.PostStaffSearchFormDataParam, metadata?: types.PostStaffSearchMetadataParam): Promise<FetchResponse<200, types.StaffBaseResponse>> {
    return this.core.fetch('/staff/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single technology
   *
   */
  getTechnology(metadata: types.GetTechnologyMetadataParam): Promise<FetchResponse<200, types.TechnologyFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/technology', 'get', metadata);
  }

  /**
   * Pagination over technology
   *
   */
  getTechnologySearch(metadata?: types.GetTechnologySearchMetadataParam): Promise<FetchResponse<200, types.TechnologyBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/technology/search', 'get', metadata);
  }

  /**
   * Searching technology
   *
   */
  postTechnologySearch(body?: types.PostTechnologySearchFormDataParam, metadata?: types.PostTechnologySearchMetadataParam): Promise<FetchResponse<200, types.TechnologyBaseResponse>> {
    return this.core.fetch('/technology/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single title
   *
   */
  getTitle(metadata: types.GetTitleMetadataParam): Promise<FetchResponse<200, types.TitleFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/title', 'get', metadata);
  }

  /**
   * Pagination over titles
   *
   */
  getTitleSearch(metadata?: types.GetTitleSearchMetadataParam): Promise<FetchResponse<200, types.TitleBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/title/search', 'get', metadata);
  }

  /**
   * Searching titles
   *
   */
  postTitleSearch(body?: types.PostTitleSearchFormDataParam, metadata?: types.PostTitleSearchMetadataParam): Promise<FetchResponse<200, types.TitleBaseResponse>> {
    return this.core.fetch('/title/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single trading card
   *
   */
  getTradingcard(metadata: types.GetTradingcardMetadataParam): Promise<FetchResponse<200, types.TradingCardFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/tradingCard', 'get', metadata);
  }

  /**
   * Pagination over trading cards
   *
   */
  getTradingcardSearch(metadata?: types.GetTradingcardSearchMetadataParam): Promise<FetchResponse<200, types.TradingCardBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/tradingCard/search', 'get', metadata);
  }

  /**
   * Searching trading cards
   *
   */
  postTradingcardSearch(body?: types.PostTradingcardSearchFormDataParam, metadata?: types.PostTradingcardSearchMetadataParam): Promise<FetchResponse<200, types.TradingCardBaseResponse>> {
    return this.core.fetch('/tradingCard/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single trading card deck
   *
   */
  getTradingcarddeck(metadata: types.GetTradingcarddeckMetadataParam): Promise<FetchResponse<200, types.TradingCardDeckFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/tradingCardDeck', 'get', metadata);
  }

  /**
   * Pagination over trading card decks
   *
   */
  getTradingcarddeckSearch(metadata?: types.GetTradingcarddeckSearchMetadataParam): Promise<FetchResponse<200, types.TradingCardDeckBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/tradingCardDeck/search', 'get', metadata);
  }

  /**
   * Searching trading card decks
   *
   */
  postTradingcarddeckSearch(body?: types.PostTradingcarddeckSearchFormDataParam, metadata?: types.PostTradingcarddeckSearchMetadataParam): Promise<FetchResponse<200, types.TradingCardDeckBaseResponse>> {
    return this.core.fetch('/tradingCardDeck/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single trading card set
   *
   */
  getTradingcardset(metadata: types.GetTradingcardsetMetadataParam): Promise<FetchResponse<200, types.TradingCardSetFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/tradingCardSet', 'get', metadata);
  }

  /**
   * Pagination over trading card sets
   *
   */
  getTradingcardsetSearch(metadata?: types.GetTradingcardsetSearchMetadataParam): Promise<FetchResponse<200, types.TradingCardSetBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/tradingCardSet/search', 'get', metadata);
  }

  /**
   * Searching trading card sets
   *
   */
  postTradingcardsetSearch(body?: types.PostTradingcardsetSearchFormDataParam, metadata?: types.PostTradingcardsetSearchMetadataParam): Promise<FetchResponse<200, types.TradingCardSetBaseResponse>> {
    return this.core.fetch('/tradingCardSet/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single video game
   *
   */
  getVideogame(metadata: types.GetVideogameMetadataParam): Promise<FetchResponse<200, types.VideoGameFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/videoGame', 'get', metadata);
  }

  /**
   * Pagination over video games
   *
   */
  getVideogameSearch(metadata?: types.GetVideogameSearchMetadataParam): Promise<FetchResponse<200, types.VideoGameBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/videoGame/search', 'get', metadata);
  }

  /**
   * Searching video games
   *
   */
  postVideogameSearch(body?: types.PostVideogameSearchFormDataParam, metadata?: types.PostVideogameSearchMetadataParam): Promise<FetchResponse<200, types.VideoGameBaseResponse>> {
    return this.core.fetch('/videoGame/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single video release
   *
   */
  getVideorelease(metadata: types.GetVideoreleaseMetadataParam): Promise<FetchResponse<200, types.VideoReleaseFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/videoRelease', 'get', metadata);
  }

  /**
   * Pagination over video releases
   *
   */
  getVideoreleaseSearch(metadata?: types.GetVideoreleaseSearchMetadataParam): Promise<FetchResponse<200, types.VideoReleaseBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/videoRelease/search', 'get', metadata);
  }

  /**
   * Searching video releases
   *
   */
  postVideoreleaseSearch(body?: types.PostVideoreleaseSearchFormDataParam, metadata?: types.PostVideoreleaseSearchMetadataParam): Promise<FetchResponse<200, types.VideoReleaseBaseResponse>> {
    return this.core.fetch('/videoRelease/search', 'post', body, metadata);
  }

  /**
   * Retrival of a single weapon
   *
   */
  getWeapon(metadata: types.GetWeaponMetadataParam): Promise<FetchResponse<200, types.WeaponFullResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/weapon', 'get', metadata);
  }

  /**
   * Pagination over weapons
   *
   */
  getWeaponSearch(metadata?: types.GetWeaponSearchMetadataParam): Promise<FetchResponse<200, types.WeaponBaseResponse> | FetchResponse<number, types.Error>> {
    return this.core.fetch('/weapon/search', 'get', metadata);
  }

  /**
   * Searching weapons
   *
   */
  postWeaponSearch(body?: types.PostWeaponSearchFormDataParam, metadata?: types.PostWeaponSearchMetadataParam): Promise<FetchResponse<200, types.WeaponBaseResponse>> {
    return this.core.fetch('/weapon/search', 'post', body, metadata);
  }
}
