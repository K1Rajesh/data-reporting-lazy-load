export interface ActivityLogDModel{
    _id:string,
    user:string,
    sessionId:string,
    date:Date
    logoutAt:Date | undefined
    lastActiveAt:Date,
    lastInactiveAt:Date | undefined,
    emailId:string,
    duration:number | undefined,
    sessionIntervalTimer:number | undefined,
    [key:string]: string | Date | number | undefined,

}
export interface UserDModel{
    user:string,
    emailId:string,
    date:Date,
    [key:string]: string | Date
}