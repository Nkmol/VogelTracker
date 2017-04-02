/**
 *  @apiDefine JwtHeader
 * 
 * @apiHeader Authorization The JWT-token header: "JWT {{ TOKEN }}".
 * @apiError {text} 401/Unauthorized You have not provided your Token credentials as header request
 */