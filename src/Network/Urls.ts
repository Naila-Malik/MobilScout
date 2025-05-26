const BASE_URL = 'https://staging-api.ourclassconnect.com';
export const ewcApiKey = '65A9A772-409F-4120-A2D3-30F78D8E76F8';
export const ewcAppId = '117B9FE0-9D5D-4A9A-9E71-469415821009';

// User Auth Urls
export const SIGNUP_URL = BASE_URL + '/v1/parents/signup';
export const LOGIN_URL = BASE_URL + '/v1/auth/parents/signin';
export const SIGNOUT_URL = BASE_URL + '/v1/auth/parents/signout';
export const VERIFY_REG_CODE_URL = BASE_URL + '/v1/auth/parents/verify-regcode';
export const GOOGLE_SIGNUP_REQUEST_URL = BASE_URL + '/v1/parents/google-signup';
export const GOOGLE_SIGNIN_REQUEST_URL = BASE_URL + '/v1/auth/parents/google-signin';
export const GET_GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
export const FORGET_PASSWORD_URL = BASE_URL + '/v1/auth/parents/forgot-password';

//Parent Home Url
export const GET_CHILD_LIST_URL = BASE_URL + '/v1/students/parents/';

// Notice Board Urls
export const GET_NOTICEBOARD_LIST_URL = BASE_URL + '/v1/notice-board/parents/list-student/';
export const GET_SCHOOL_NOTICEBOARD_DETAILS_URL = BASE_URL + '/v1/notice-board/parents/noticeboard-school-detail/';
export const GET_STUDENT_NOTICEBOARD_DETAILS_URL = BASE_URL + '/v1/notice-board/parents/noticeboard-student-detail/';

//Appointments Urls
export const GET_APPOINTMENT_LISTING = BASE_URL + '/v1/appointments/parents/'
export const GET_APPOINTMENT_DETAILS = BASE_URL + '/v1/appointments/parents/appointment-detail/'
export const CREATE_APPOINTMENT_URL = BASE_URL + '/v1/appointments/parents/create'
export const BLOCKED_DATES_URL = BASE_URL + '/v1/appointments/parents/block/'
export const AVAILABLE_SLOTS_URL = BASE_URL + '/v1/appointments/parents/available-slots/'

// Gallery Urls
export const GET_PHOTO_GALLERY_LIST_URL = BASE_URL + '/v1/photo-gallery/parents/';
export const GET_PHOTO_DETAILS_URL = BASE_URL + '/v1/photo-gallery/parents/photo-detail/';
export const GET_VIDEO_GALLERY_LIST_URL = BASE_URL + '/v1/video-gallery/parents/';
export const GET_VIDEO_DETAILS_URL = BASE_URL + '/v1/video-gallery/parents/video-detail/';

//School Calendar Listing
export const CALENDAR_LISTING_URL = BASE_URL + '/v1/events/parents/';
export const CALENDAR_LIST_DETAIL = BASE_URL + '/v1/events/parents/event-detail/';

//Class Timetable Urls
export const GET_TIME_TABLE_LIST = BASE_URL + '/v1/timetable/parents/';

//Staff room and Teachers details Urls
export const TEACHER_DETAIL = BASE_URL + '/v1/teachers/parents/teacher-detail/';
export const TEACHERS_LISTING = BASE_URL + '/v1/teachers/parents/';