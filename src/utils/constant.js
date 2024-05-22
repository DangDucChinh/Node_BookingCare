export const path = { // cấu hình đường link cho cả projetc , link trên web để tìm thành phần react.
    HOME: '/',
    HOMEPAGE : '/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system' , 
    DETAIL_DOCTOR : '/detail-doctor/:id' , 
    DOCTOR : '/doctor', // tự cấu hình trong #71  ,
    DETAIL_SPECIALTY : '/detail-specialty/:id' , 
    VERIFY_EMAIL_BOOKING:'/verify-booking',
    DETAIL_CLINIC : '/detail-clinic/:id' , 

    DETAIL_HANDBOOK : '/detail-handbook/:id', 
    SPECIALTIES : '/specialties',
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};

export const USER_ROLE = {
    ADMIN : 'R1' , 
    DOCTOR : 'R2',
    PATIENT : 'R3'
}

 
export const CRUD_ACTIONS = {
    ADD: "ADD",
    EDIT: "EDIT",
    CREATE : "CREATE",
    DELETE: "DELETE",
    READ : "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}