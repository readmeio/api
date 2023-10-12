const AppPkcs12 = {"additionalProperties":false,"properties":{"p12File":{"description":"The `.p12` file containing the app's APNs information.","format":"binary","type":"string"},"p12Pass":{"description":"The password for the corresponding `.p12` file.","type":"string"}},"required":["p12File","p12Pass"],"type":"object","title":"app_pkcs12","x-readme-ref-name":"app_pkcs12"} as const
;
export default AppPkcs12
