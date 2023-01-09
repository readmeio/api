import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type Apply = FromSchema<typeof schemas.Apply>;
export type BaseError = FromSchema<typeof schemas.BaseError>;
export type Category = FromSchema<typeof schemas.Category>;
export type Changelog = FromSchema<typeof schemas.Changelog>;
export type CondensedProjectData = FromSchema<typeof schemas.CondensedProjectData>;
export type CreateCategoryMetadataParam = FromSchema<typeof schemas.CreateCategory.metadata>;
export type CreateCustomPageResponse401 = FromSchema<
  (typeof schemas.CreateCustomPage.response)['401']
>;
export type CreateCustomPageResponse403 = FromSchema<
  (typeof schemas.CreateCustomPage.response)['403']
>;
export type CreateDocMetadataParam = FromSchema<typeof schemas.CreateDoc.metadata>;
export type CreateDocResponse401 = FromSchema<(typeof schemas.CreateDoc.response)['401']>;
export type CreateDocResponse403 = FromSchema<(typeof schemas.CreateDoc.response)['403']>;
export type CreateVersionResponse400 = FromSchema<(typeof schemas.CreateVersion.response)['400']>;
export type CreateVersionResponse401 = FromSchema<(typeof schemas.CreateVersion.response)['401']>;
export type CreateVersionResponse403 = FromSchema<(typeof schemas.CreateVersion.response)['403']>;
export type CustomPage = FromSchema<typeof schemas.CustomPage>;
export type DeleteApiSpecificationMetadataParam = FromSchema<
  typeof schemas.DeleteApiSpecification.metadata
>;
export type DeleteApiSpecificationResponse401 = FromSchema<
  (typeof schemas.DeleteApiSpecification.response)['401']
>;
export type DeleteApiSpecificationResponse403 = FromSchema<
  (typeof schemas.DeleteApiSpecification.response)['403']
>;
export type DeleteCategoryMetadataParam = FromSchema<typeof schemas.DeleteCategory.metadata>;
export type DeleteChangelogMetadataParam = FromSchema<typeof schemas.DeleteChangelog.metadata>;
export type DeleteCustomPageMetadataParam = FromSchema<typeof schemas.DeleteCustomPage.metadata>;
export type DeleteCustomPageResponse401 = FromSchema<
  (typeof schemas.DeleteCustomPage.response)['401']
>;
export type DeleteCustomPageResponse403 = FromSchema<
  (typeof schemas.DeleteCustomPage.response)['403']
>;
export type DeleteDocMetadataParam = FromSchema<typeof schemas.DeleteDoc.metadata>;
export type DeleteDocResponse401 = FromSchema<(typeof schemas.DeleteDoc.response)['401']>;
export type DeleteDocResponse403 = FromSchema<(typeof schemas.DeleteDoc.response)['403']>;
export type DeleteVersionMetadataParam = FromSchema<typeof schemas.DeleteVersion.metadata>;
export type DeleteVersionResponse401 = FromSchema<(typeof schemas.DeleteVersion.response)['401']>;
export type DeleteVersionResponse403 = FromSchema<(typeof schemas.DeleteVersion.response)['403']>;
export type Doc = FromSchema<typeof schemas.Doc>;
export type ErrorApikeyEmpty = FromSchema<typeof schemas.ErrorApikeyEmpty>;
export type ErrorApikeyMismatch = FromSchema<typeof schemas.ErrorApikeyMismatch>;
export type ErrorApikeyNotfound = FromSchema<typeof schemas.ErrorApikeyNotfound>;
export type ErrorApplyInvalidEmail = FromSchema<typeof schemas.ErrorApplyInvalidEmail>;
export type ErrorApplyInvalidJob = FromSchema<typeof schemas.ErrorApplyInvalidJob>;
export type ErrorApplyInvalidName = FromSchema<typeof schemas.ErrorApplyInvalidName>;
export type ErrorCategoryInvalid = FromSchema<typeof schemas.ErrorCategoryInvalid>;
export type ErrorCategoryNotfound = FromSchema<typeof schemas.ErrorCategoryNotfound>;
export type ErrorChangelogInvalid = FromSchema<typeof schemas.ErrorChangelogInvalid>;
export type ErrorChangelogNotfound = FromSchema<typeof schemas.ErrorChangelogNotfound>;
export type ErrorCustompageInvalid = FromSchema<typeof schemas.ErrorCustompageInvalid>;
export type ErrorCustompageNotfound = FromSchema<typeof schemas.ErrorCustompageNotfound>;
export type ErrorDocInvalid = FromSchema<typeof schemas.ErrorDocInvalid>;
export type ErrorDocNotfound = FromSchema<typeof schemas.ErrorDocNotfound>;
export type ErrorEndpointNotfound = FromSchema<typeof schemas.ErrorEndpointNotfound>;
export type ErrorInternalError = FromSchema<typeof schemas.ErrorInternalError>;
export type ErrorProjectNeedsstaging = FromSchema<typeof schemas.ErrorProjectNeedsstaging>;
export type ErrorProjectNotfound = FromSchema<typeof schemas.ErrorProjectNotfound>;
export type ErrorRegistryInvalid = FromSchema<typeof schemas.ErrorRegistryInvalid>;
export type ErrorRegistryNotfound = FromSchema<typeof schemas.ErrorRegistryNotfound>;
export type ErrorSpecFileEmpty = FromSchema<typeof schemas.ErrorSpecFileEmpty>;
export type ErrorSpecIdDuplicate = FromSchema<typeof schemas.ErrorSpecIdDuplicate>;
export type ErrorSpecIdInvalid = FromSchema<typeof schemas.ErrorSpecIdInvalid>;
export type ErrorSpecInvalid = FromSchema<typeof schemas.ErrorSpecInvalid>;
export type ErrorSpecInvalidSchema = FromSchema<typeof schemas.ErrorSpecInvalidSchema>;
export type ErrorSpecNotfound = FromSchema<typeof schemas.ErrorSpecNotfound>;
export type ErrorSpecTimeout = FromSchema<typeof schemas.ErrorSpecTimeout>;
export type ErrorSpecVersionNotfound = FromSchema<typeof schemas.ErrorSpecVersionNotfound>;
export type ErrorUnexpectedError = FromSchema<typeof schemas.ErrorUnexpectedError>;
export type ErrorVersionCantDemoteStable = FromSchema<typeof schemas.ErrorVersionCantDemoteStable>;
export type ErrorVersionCantRemoveStable = FromSchema<typeof schemas.ErrorVersionCantRemoveStable>;
export type ErrorVersionDuplicate = FromSchema<typeof schemas.ErrorVersionDuplicate>;
export type ErrorVersionEmpty = FromSchema<typeof schemas.ErrorVersionEmpty>;
export type ErrorVersionForkEmpty = FromSchema<typeof schemas.ErrorVersionForkEmpty>;
export type ErrorVersionForkNotfound = FromSchema<typeof schemas.ErrorVersionForkNotfound>;
export type ErrorVersionInvalid = FromSchema<typeof schemas.ErrorVersionInvalid>;
export type ErrorVersionNotfound = FromSchema<typeof schemas.ErrorVersionNotfound>;
export type GetApiRegistryMetadataParam = FromSchema<typeof schemas.GetApiRegistry.metadata>;
export type GetApiRegistryResponse200 = FromSchema<(typeof schemas.GetApiRegistry.response)['200']>;
export type GetApiSpecificationMetadataParam = FromSchema<
  typeof schemas.GetApiSpecification.metadata
>;
export type GetApiSpecificationResponse200 = FromSchema<
  (typeof schemas.GetApiSpecification.response)['200']
>;
export type GetApiSpecificationResponse401 = FromSchema<
  (typeof schemas.GetApiSpecification.response)['401']
>;
export type GetApiSpecificationResponse403 = FromSchema<
  (typeof schemas.GetApiSpecification.response)['403']
>;
export type GetCategoriesMetadataParam = FromSchema<typeof schemas.GetCategories.metadata>;
export type GetCategoriesResponse200 = FromSchema<(typeof schemas.GetCategories.response)['200']>;
export type GetCategoryDocsMetadataParam = FromSchema<typeof schemas.GetCategoryDocs.metadata>;
export type GetCategoryMetadataParam = FromSchema<typeof schemas.GetCategory.metadata>;
export type GetChangelogMetadataParam = FromSchema<typeof schemas.GetChangelog.metadata>;
export type GetChangelogsMetadataParam = FromSchema<typeof schemas.GetChangelogs.metadata>;
export type GetChangelogsResponse200 = FromSchema<(typeof schemas.GetChangelogs.response)['200']>;
export type GetCustomPageMetadataParam = FromSchema<typeof schemas.GetCustomPage.metadata>;
export type GetCustomPageResponse401 = FromSchema<(typeof schemas.GetCustomPage.response)['401']>;
export type GetCustomPageResponse403 = FromSchema<(typeof schemas.GetCustomPage.response)['403']>;
export type GetCustomPagesMetadataParam = FromSchema<typeof schemas.GetCustomPages.metadata>;
export type GetCustomPagesResponse200 = FromSchema<(typeof schemas.GetCustomPages.response)['200']>;
export type GetCustomPagesResponse401 = FromSchema<(typeof schemas.GetCustomPages.response)['401']>;
export type GetCustomPagesResponse403 = FromSchema<(typeof schemas.GetCustomPages.response)['403']>;
export type GetDocMetadataParam = FromSchema<typeof schemas.GetDoc.metadata>;
export type GetDocResponse401 = FromSchema<(typeof schemas.GetDoc.response)['401']>;
export type GetDocResponse403 = FromSchema<(typeof schemas.GetDoc.response)['403']>;
export type GetErrorsResponse401 = FromSchema<(typeof schemas.GetErrors.response)['401']>;
export type GetErrorsResponse403 = FromSchema<(typeof schemas.GetErrors.response)['403']>;
export type GetOpenRolesResponse200 = FromSchema<(typeof schemas.GetOpenRoles.response)['200']>;
export type GetProductionDocMetadataParam = FromSchema<typeof schemas.GetProductionDoc.metadata>;
export type GetProductionDocResponse401 = FromSchema<
  (typeof schemas.GetProductionDoc.response)['401']
>;
export type GetProductionDocResponse403 = FromSchema<
  (typeof schemas.GetProductionDoc.response)['403']
>;
export type GetProjectResponse401 = FromSchema<(typeof schemas.GetProject.response)['401']>;
export type GetProjectResponse403 = FromSchema<(typeof schemas.GetProject.response)['403']>;
export type GetVersionMetadataParam = FromSchema<typeof schemas.GetVersion.metadata>;
export type GetVersionResponse401 = FromSchema<(typeof schemas.GetVersion.response)['401']>;
export type GetVersionResponse403 = FromSchema<(typeof schemas.GetVersion.response)['403']>;
export type GetVersionsResponse401 = FromSchema<(typeof schemas.GetVersions.response)['401']>;
export type GetVersionsResponse403 = FromSchema<(typeof schemas.GetVersions.response)['403']>;
export type JobOpening = FromSchema<typeof schemas.JobOpening>;
export type SearchDocsMetadataParam = FromSchema<typeof schemas.SearchDocs.metadata>;
export type SearchDocsResponse401 = FromSchema<(typeof schemas.SearchDocs.response)['401']>;
export type SearchDocsResponse403 = FromSchema<(typeof schemas.SearchDocs.response)['403']>;
export type UpdateApiSpecificationBodyParam = FromSchema<
  typeof schemas.UpdateApiSpecification.body
>;
export type UpdateApiSpecificationMetadataParam = FromSchema<
  typeof schemas.UpdateApiSpecification.metadata
>;
export type UpdateApiSpecificationResponse400 = FromSchema<
  (typeof schemas.UpdateApiSpecification.response)['400']
>;
export type UpdateApiSpecificationResponse401 = FromSchema<
  (typeof schemas.UpdateApiSpecification.response)['401']
>;
export type UpdateApiSpecificationResponse403 = FromSchema<
  (typeof schemas.UpdateApiSpecification.response)['403']
>;
export type UpdateCategoryMetadataParam = FromSchema<typeof schemas.UpdateCategory.metadata>;
export type UpdateChangelogMetadataParam = FromSchema<typeof schemas.UpdateChangelog.metadata>;
export type UpdateCustomPageMetadataParam = FromSchema<typeof schemas.UpdateCustomPage.metadata>;
export type UpdateCustomPageResponse401 = FromSchema<
  (typeof schemas.UpdateCustomPage.response)['401']
>;
export type UpdateCustomPageResponse403 = FromSchema<
  (typeof schemas.UpdateCustomPage.response)['403']
>;
export type UpdateDocMetadataParam = FromSchema<typeof schemas.UpdateDoc.metadata>;
export type UpdateDocResponse401 = FromSchema<(typeof schemas.UpdateDoc.response)['401']>;
export type UpdateDocResponse403 = FromSchema<(typeof schemas.UpdateDoc.response)['403']>;
export type UpdateVersionMetadataParam = FromSchema<typeof schemas.UpdateVersion.metadata>;
export type UpdateVersionResponse401 = FromSchema<(typeof schemas.UpdateVersion.response)['401']>;
export type UpdateVersionResponse403 = FromSchema<(typeof schemas.UpdateVersion.response)['403']>;
export type UploadApiSpecificationBodyParam = FromSchema<
  typeof schemas.UploadApiSpecification.body
>;
export type UploadApiSpecificationMetadataParam = FromSchema<
  typeof schemas.UploadApiSpecification.metadata
>;
export type UploadApiSpecificationResponse400 = FromSchema<
  (typeof schemas.UploadApiSpecification.response)['400']
>;
export type UploadApiSpecificationResponse401 = FromSchema<
  (typeof schemas.UploadApiSpecification.response)['401']
>;
export type UploadApiSpecificationResponse403 = FromSchema<
  (typeof schemas.UploadApiSpecification.response)['403']
>;
export type Version = FromSchema<typeof schemas.Version>;
