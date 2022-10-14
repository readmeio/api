import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type Apply = FromSchema<typeof schemas.Apply>;
export type BaseError = FromSchema<typeof schemas.BaseError>;
export type Category = FromSchema<typeof schemas.Category>;
export type Changelog = FromSchema<typeof schemas.Changelog>;
export type CondensedProjectData = FromSchema<typeof schemas.CondensedProjectData>;
export type CreateCategoryMetadataParam = FromSchema<typeof schemas.createCategory.metadata>;
export type CreateCustomPageResponse401 = FromSchema<
  typeof schemas.createCustomPage.response['401']
>;
export type CreateCustomPageResponse403 = FromSchema<
  typeof schemas.createCustomPage.response['403']
>;
export type CreateDocMetadataParam = FromSchema<typeof schemas.createDoc.metadata>;
export type CreateDocResponse401 = FromSchema<typeof schemas.createDoc.response['401']>;
export type CreateDocResponse403 = FromSchema<typeof schemas.createDoc.response['403']>;
export type CreateVersionResponse400 = FromSchema<typeof schemas.createVersion.response['400']>;
export type CreateVersionResponse401 = FromSchema<typeof schemas.createVersion.response['401']>;
export type CreateVersionResponse403 = FromSchema<typeof schemas.createVersion.response['403']>;
export type CustomPage = FromSchema<typeof schemas.CustomPage>;
export type DeleteApiSpecificationMetadataParam = FromSchema<
  typeof schemas.deleteAPISpecification.metadata
>;
export type DeleteApiSpecificationResponse401 = FromSchema<
  typeof schemas.deleteAPISpecification.response['401']
>;
export type DeleteApiSpecificationResponse403 = FromSchema<
  typeof schemas.deleteAPISpecification.response['403']
>;
export type DeleteCategoryMetadataParam = FromSchema<typeof schemas.deleteCategory.metadata>;
export type DeleteChangelogMetadataParam = FromSchema<typeof schemas.deleteChangelog.metadata>;
export type DeleteCustomPageMetadataParam = FromSchema<typeof schemas.deleteCustomPage.metadata>;
export type DeleteCustomPageResponse401 = FromSchema<
  typeof schemas.deleteCustomPage.response['401']
>;
export type DeleteCustomPageResponse403 = FromSchema<
  typeof schemas.deleteCustomPage.response['403']
>;
export type DeleteDocMetadataParam = FromSchema<typeof schemas.deleteDoc.metadata>;
export type DeleteDocResponse401 = FromSchema<typeof schemas.deleteDoc.response['401']>;
export type DeleteDocResponse403 = FromSchema<typeof schemas.deleteDoc.response['403']>;
export type DeleteVersionMetadataParam = FromSchema<typeof schemas.deleteVersion.metadata>;
export type DeleteVersionResponse401 = FromSchema<typeof schemas.deleteVersion.response['401']>;
export type DeleteVersionResponse403 = FromSchema<typeof schemas.deleteVersion.response['403']>;
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
export type ErrorProjectNotfound = FromSchema<typeof schemas.ErrorProjectNotfound>;
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
export type GetApiRegistryMetadataParam = FromSchema<typeof schemas.getAPIRegistry.metadata>;
export type GetApiRegistryResponse200 = FromSchema<typeof schemas.getAPIRegistry.response['200']>;
export type GetApiSpecificationMetadataParam = FromSchema<
  typeof schemas.getAPISpecification.metadata
>;
export type GetApiSpecificationResponse200 = FromSchema<
  typeof schemas.getAPISpecification.response['200']
>;
export type GetApiSpecificationResponse401 = FromSchema<
  typeof schemas.getAPISpecification.response['401']
>;
export type GetApiSpecificationResponse403 = FromSchema<
  typeof schemas.getAPISpecification.response['403']
>;
export type GetCategoriesMetadataParam = FromSchema<typeof schemas.getCategories.metadata>;
export type GetCategoriesResponse200 = FromSchema<typeof schemas.getCategories.response['200']>;
export type GetCategoryDocsMetadataParam = FromSchema<typeof schemas.getCategoryDocs.metadata>;
export type GetCategoryMetadataParam = FromSchema<typeof schemas.getCategory.metadata>;
export type GetChangelogMetadataParam = FromSchema<typeof schemas.getChangelog.metadata>;
export type GetChangelogsMetadataParam = FromSchema<typeof schemas.getChangelogs.metadata>;
export type GetChangelogsResponse200 = FromSchema<typeof schemas.getChangelogs.response['200']>;
export type GetCustomPageMetadataParam = FromSchema<typeof schemas.getCustomPage.metadata>;
export type GetCustomPageResponse401 = FromSchema<typeof schemas.getCustomPage.response['401']>;
export type GetCustomPageResponse403 = FromSchema<typeof schemas.getCustomPage.response['403']>;
export type GetCustomPagesMetadataParam = FromSchema<typeof schemas.getCustomPages.metadata>;
export type GetCustomPagesResponse200 = FromSchema<typeof schemas.getCustomPages.response['200']>;
export type GetCustomPagesResponse401 = FromSchema<typeof schemas.getCustomPages.response['401']>;
export type GetCustomPagesResponse403 = FromSchema<typeof schemas.getCustomPages.response['403']>;
export type GetDocMetadataParam = FromSchema<typeof schemas.getDoc.metadata>;
export type GetDocResponse401 = FromSchema<typeof schemas.getDoc.response['401']>;
export type GetDocResponse403 = FromSchema<typeof schemas.getDoc.response['403']>;
export type GetErrorsResponse401 = FromSchema<typeof schemas.getErrors.response['401']>;
export type GetErrorsResponse403 = FromSchema<typeof schemas.getErrors.response['403']>;
export type GetOpenRolesResponse200 = FromSchema<typeof schemas.getOpenRoles.response['200']>;
export type GetProjectResponse401 = FromSchema<typeof schemas.getProject.response['401']>;
export type GetProjectResponse403 = FromSchema<typeof schemas.getProject.response['403']>;
export type GetVersionMetadataParam = FromSchema<typeof schemas.getVersion.metadata>;
export type GetVersionResponse401 = FromSchema<typeof schemas.getVersion.response['401']>;
export type GetVersionResponse403 = FromSchema<typeof schemas.getVersion.response['403']>;
export type GetVersionsResponse401 = FromSchema<typeof schemas.getVersions.response['401']>;
export type GetVersionsResponse403 = FromSchema<typeof schemas.getVersions.response['403']>;
export type JobOpening = FromSchema<typeof schemas.JobOpening>;
export type SearchDocsMetadataParam = FromSchema<typeof schemas.searchDocs.metadata>;
export type SearchDocsResponse401 = FromSchema<typeof schemas.searchDocs.response['401']>;
export type SearchDocsResponse403 = FromSchema<typeof schemas.searchDocs.response['403']>;
export type UpdateApiSpecificationBodyParam = FromSchema<
  typeof schemas.updateAPISpecification.body
>;
export type UpdateApiSpecificationMetadataParam = FromSchema<
  typeof schemas.updateAPISpecification.metadata
>;
export type UpdateApiSpecificationResponse400 = FromSchema<
  typeof schemas.updateAPISpecification.response['400']
>;
export type UpdateApiSpecificationResponse401 = FromSchema<
  typeof schemas.updateAPISpecification.response['401']
>;
export type UpdateApiSpecificationResponse403 = FromSchema<
  typeof schemas.updateAPISpecification.response['403']
>;
export type UpdateCategoryMetadataParam = FromSchema<typeof schemas.updateCategory.metadata>;
export type UpdateChangelogMetadataParam = FromSchema<typeof schemas.updateChangelog.metadata>;
export type UpdateCustomPageMetadataParam = FromSchema<typeof schemas.updateCustomPage.metadata>;
export type UpdateCustomPageResponse401 = FromSchema<
  typeof schemas.updateCustomPage.response['401']
>;
export type UpdateCustomPageResponse403 = FromSchema<
  typeof schemas.updateCustomPage.response['403']
>;
export type UpdateDocMetadataParam = FromSchema<typeof schemas.updateDoc.metadata>;
export type UpdateDocResponse401 = FromSchema<typeof schemas.updateDoc.response['401']>;
export type UpdateDocResponse403 = FromSchema<typeof schemas.updateDoc.response['403']>;
export type UpdateVersionMetadataParam = FromSchema<typeof schemas.updateVersion.metadata>;
export type UpdateVersionResponse401 = FromSchema<typeof schemas.updateVersion.response['401']>;
export type UpdateVersionResponse403 = FromSchema<typeof schemas.updateVersion.response['403']>;
export type UploadApiSpecificationBodyParam = FromSchema<
  typeof schemas.uploadAPISpecification.body
>;
export type UploadApiSpecificationMetadataParam = FromSchema<
  typeof schemas.uploadAPISpecification.metadata
>;
export type UploadApiSpecificationResponse400 = FromSchema<
  typeof schemas.uploadAPISpecification.response['400']
>;
export type UploadApiSpecificationResponse401 = FromSchema<
  typeof schemas.uploadAPISpecification.response['401']
>;
export type UploadApiSpecificationResponse403 = FromSchema<
  typeof schemas.uploadAPISpecification.response['403']
>;
export type Version = FromSchema<typeof schemas.Version>;
