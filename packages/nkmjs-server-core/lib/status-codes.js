'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
const STATUSES = {};
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1
 * This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
 */
STATUSES.CONTINUE = Object.freeze({ code: 100, msg: `Continue` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.2
 * This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.
 */
STATUSES.SWITCHING_PROTOCOLS = Object.freeze({ code: 101, msg: `Switching Protocols` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.1
 * This code indicates that the server has received and is processing the request, but no response is available yet.
 */
STATUSES.PROCESSING = Object.freeze({ code: 102, msg: `Processing` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1
 * The request has succeeded. The meaning of a success varies depending on the HTTP method:
 * GET: The resource has been fetched and is transmitted in the message body.
 * HEAD: The entity headers are in the message body.
 * POST: The resource describing the result of the action is transmitted in the message body.
 * TRACE: The message body contains the request message as received by the server
 */
STATUSES.OK = Object.freeze({ code: 200, msg: `OK` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2
 * The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
 */
STATUSES.CREATED = Object.freeze({ code: 201, msg: `Created` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3
 * The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
 */
STATUSES.ACCEPTED = Object.freeze({ code: 202, msg: `Accepted` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.4
 * This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
 */
STATUSES.NON_AUTHORITATIVE_INFORMATION = Object.freeze({ code: 203, msg: `Non Authoritative Information` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5
 * There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
 */
STATUSES.NO_CONTENT = Object.freeze({ code: 204, msg: `No Content` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.6
 * This response code is sent after accomplishing request to tell user agent reset document view which sent this request.
 */
STATUSES.RESET_CONTENT = Object.freeze({ code: 205, msg: `Reset Content` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.1
 * This response code is used because of range header sent by the client to separate download into multiple streams.
 */
STATUSES.PARTIAL_CONTENT = Object.freeze({ code: 206, msg: `Partial Content` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.2
 *
 * A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
 */
STATUSES.MULTI_STATUS = Object.freeze({ code: 207, msg: `Multi-Status` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1
 * The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
 */
STATUSES.MULTIPLE_CHOICES = Object.freeze({ code: 300, msg: `Multiple Choices` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2
 * This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
 */
STATUSES.MOVED_PERMANENTLY = Object.freeze({ code: 301, msg: `Moved Permanently` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3
 * This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
 */
STATUSES.MOVED_TEMPORARILY = Object.freeze({ code: 302, msg: `Moved Temporarily` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.4
 *
 * Server sent this response to directing client to get requested resource to another URI with an GET request.
 */
STATUSES.SEE_OTHER = Object.freeze({ code: 303, msg: `See Other` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.1
 * This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
 */
STATUSES.NOT_MODIFIED = Object.freeze({ code: 304, msg: `Not Modified` });
/**
 * @deprecated
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.6
 * Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.
 */
STATUSES.USE_PROXY = Object.freeze({ code: 305, msg: `Use Proxy` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.7
 * Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
 */
STATUSES.TEMPORARY_REDIRECT = Object.freeze({ code: 307, msg: `Temporary Redirect` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7538#section-3
 * This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
 */
STATUSES.PERMANENT_REDIRECT = Object.freeze({ code: 308, msg: `Permanent Redirect` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1
 * This response means that server could not understand the request due to invalid syntax.
 */
STATUSES.BAD_REQUEST = Object.freeze({ code: 400, msg: `Bad Request` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.1
 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 */
STATUSES.UNAUTHORIZED = Object.freeze({ code: 401, msg: `Unauthorized` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.2
 * This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
 */
STATUSES.PAYMENT_REQUIRED = Object.freeze({ code: 402, msg: `Payment Required` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.3
 * The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
 */
STATUSES.FORBIDDEN = Object.freeze({ code: 403, msg: `Forbidden` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.4
 * The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.
 */
STATUSES.NOT_FOUND = Object.freeze({ code: 404, msg: `Not Found` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.5
 * The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
 */
STATUSES.METHOD_NOT_ALLOWED = Object.freeze({ code: 405, msg: `Method Not Allowed` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.6
 * This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
 */
STATUSES.NOT_ACCEPTABLE = Object.freeze({ code: 406, msg: `Not Acceptable` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.2
 * This is similar to 401 but authentication is needed to be done by a proxy.
 */
STATUSES.PROXY_AUTHENTICATION_REQUIRED = Object.freeze({ code: 407, msg: `Proxy Authentication Required` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.7
 * This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
 */
STATUSES.REQUEST_TIMEOUT = Object.freeze({ code: 408, msg: `Request Timeout` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.8
 * This response is sent when a request conflicts with the current state of the server.
 */
STATUSES.CONFLICT = Object.freeze({ code: 409, msg: `Conflict` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.9
 * This response would be sent when the requested content has been permenantly deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
 */
STATUSES.GONE = Object.freeze({ code: 410, msg: `Gone` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.10
 * The server rejected the request because the Content-Length header field is not defined and the server requires it.
 */
STATUSES.LENGTH_REQUIRED = Object.freeze({ code: 411, msg: `Length Required` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.2
 * The client has indicated preconditions in its headers which the server does not meet.
 */
STATUSES.PRECONDITION_FAILED = Object.freeze({ code: 412, msg: `Precondition Failed` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.11
 * Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.
 */
STATUSES.REQUEST_TOO_LONG = Object.freeze({ code: 413, msg: `Request Entity Too Large` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.12
 * The URI requested by the client is longer than the server is willing to interpret.
 */
STATUSES.REQUEST_URI_TOO_LONG = Object.freeze({ code: 414, msg: `Request-URI Too Long` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.13
 * The media format of the requested data is not supported by the server, so the server is rejecting the request.
 */
STATUSES.UNSUPPORTED_MEDIA_TYPE = Object.freeze({ code: 415, msg: `Unsupported Media Type` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.4
 * The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.
 */
STATUSES.REQUESTED_RANGE_NOT_SATISFIABLE = Object.freeze({ code: 416, msg: `Requested Range Not Satisfiable` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14
 * This response code means the expectation indicated by the Expect request header field can't be met by the server.
 */
STATUSES.EXPECTATION_FAILED = Object.freeze({ code: 417, msg: `Expectation Failed` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2324#section-2.3.2
 * Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
 */
STATUSES.IM_A_TEAPOT = Object.freeze({ code: 418, msg: `I'm a teapot` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
 * The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
 */
STATUSES.INSUFFICIENT_SPACE_ON_RESOURCE = Object.freeze({ code: 419, msg: `Insufficient Space on Resource` });
/**
 * @deprecated
 * Official Documentation @ https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt
 * A deprecated response used by the Spring Framework when a method has failed.
 */
STATUSES.METHOD_FAILURE = Object.freeze({ code: 420, msg: `Method Failure` });
/**
 * Official Documentation @ https://datatracker.ietf.org/doc/html/rfc7540#section-9.1.2
 *
 * Defined in the specification of HTTP/2 to indicate that a server is not able to produce a response for the combination of scheme and authority that are included in the request URI.
 */
STATUSES.MISDIRECTED_REQUEST = Object.freeze({ code: 421, msg: `Misdirected Request` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.3
 * The request was well-formed but was unable to be followed due to semantic errors.
 */
STATUSES.UNPROCESSABLE_ENTITY = Object.freeze({ code: 422, msg: `Unprocessable Entity` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.4
 * The resource that is being accessed is locked.
 */
STATUSES.LOCKED = Object.freeze({ code: 423, msg: `Locked` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.5
 * The request failed due to failure of a previous request.
 */
STATUSES.FAILED_DEPENDENCY = Object.freeze({ code: 424, msg: `Failed Dependency` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-3
 * The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
 */
STATUSES.PRECONDITION_REQUIRED = Object.freeze({ code: 428, msg: `Precondition Required` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-4
 * The user has sent too many requests in a given amount of time ("rate limiting").
 */
STATUSES.TOO_MANY_REQUESTS = Object.freeze({ code: 429, msg: `Too Many Requests` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-5
 * The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.
 */
STATUSES.REQUEST_HEADER_FIELDS_TOO_LARGE = Object.freeze({ code: 431, msg: `Request Header Fields Too Large` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7725
 * The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.
 */
STATUSES.UNAVAILABLE_FOR_LEGAL_REASONS = Object.freeze({ code: 451, msg: `Unavailable For Legal Reasons` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7725
 * The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.
 */
STATUSES.NO_RESPONSE = Object.freeze({ code: 444, msg: `No response` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1
 * The server encountered an unexpected condition that prevented it from fulfilling the request.
 */
STATUSES.INTERNAL_SERVER_ERROR = Object.freeze({ code: 500, msg: `Internal Server Error` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2
 * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
 */
STATUSES.NOT_IMPLEMENTED = Object.freeze({ code: 501, msg: `Not Implemented` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.3
 * This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
 */
STATUSES.BAD_GATEWAY = Object.freeze({ code: 502, msg: `Bad Gateway` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.4
 * The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
 */
STATUSES.SERVICE_UNAVAILABLE = Object.freeze({ code: 503, msg: `Service Unavailable` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.5
 * This error response is given when the server is acting as a gateway and cannot get a response in time.
 */
STATUSES.GATEWAY_TIMEOUT = Object.freeze({ code: 504, msg: `Gateway Timeout` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.6
 * The HTTP version used in the request is not supported by the server.
 */
STATUSES.HTTP_VERSION_NOT_SUPPORTED = Object.freeze({ code: 505, msg: `HTTP Version Not Supported` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
 * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
 */
STATUSES.INSUFFICIENT_STORAGE = Object.freeze({ code: 507, msg: `Insufficient Storage` });
/**
 * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-6
 * The 511 status code indicates that the client needs to authenticate to gain network access.
 */
STATUSES.NETWORK_AUTHENTICATION_REQUIRED = Object.freeze({ code: 511, msg: `Network Authentication Required` });

let codes = [];
for (let v in STATUSES) { codes.push(STATUSES[v]); }

STATUSES.STATUS_CODES = codes;

STATUSES.isStatus = function (p_obj) {
    return this.STATUS_CODES.includes(p_obj);
}

STATUSES.getStatus = function (p_code) {
    for (let i = 0, n = this.STATUS_CODES.length; i < n; i++) {
        let status = this.STATUS_CODES[i];
        if (status.code == p_code) { return status; }
    }
    return null;
}

STATUSES.toError = function (p_status) {
    let error = new Error(p_status.msg);
    error.status = p_status.code;
    return error;
}

module.exports = STATUSES;