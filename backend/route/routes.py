from controllers.usersController import Register,Login, ValidateAccount, SentRecoverPassword, RecoverPasssword, ModificationPassword, profileedis, ChangePassword, ModifyImg, ModifyName

from controllers.work_environment import CreateEnvironment, ShowEnvironment, RemoveEnvironment, SearchEnvironment, ManageUsers, ManageUsersRemove, JoinByCode, SearchManage, SendMailCollaborators, ChangeStatus, Main_bringEnvironmentData, Main_RegisterClient, Main_ConsultClient

from controllers.authenticationController import AuthorizationControllers

from controllers.deviceController import createdevice,getdevice,changestatusPending,deletedevice, showpending, CountDevice, moreInfoDevice, editDevice, showDevicesInProgress, moreInfoDeviceProgress, myDashboardGet,getInfoRepair,saveInfoRepair,changeCheckStaus, ClientInfoDevice, ShowFinished, removeDevice

from controllers.clientController import createclient,searchclient,editclient,deleteclient,showClients,searchClient,showHistory, consultClient

users = {
    "create_user":"/api/v01/register","create_user_controllers": Register.as_view("create_api"),
    "Login_user":"/api/v01/login","login_user_controllers": Login.as_view("login_api"),
    "validate_account_user":"/api/v01/activated/<id>","validate_account": ValidateAccount.as_view("validate_api"),
    "recover_email_user":"/api/v01/recover","recover_email": SentRecoverPassword.as_view("recover_email_api"),
    "recover_password_user":"/api/v01/recover/pass/<id>","recover_password": RecoverPasssword.as_view("Recover_pass_api"),
    "modification_password_user":"/api/v01/recover/modification","modification_password": ModificationPassword.as_view("modification_pass_api"),
    "authorization_user":"/api/v01/authorization","authorization_user_controller": AuthorizationControllers.as_view("authorization_api"),
    "editProfile_user":"/api/v01/editprofile/<id>","editprofile_user_controller": profileedis.as_view("editprofile_api"),
    "profile_img":"/api/v01/edit_img","profile_img_controller": ModifyImg.as_view("Modify_img_api"),
    "profile_name":"/api/v01/edit_name","profile_name_controller": ModifyName.as_view("Modify_name_api"),
    "profile_change_password":"/api/v01/change_password","profile_change_password_controller": ChangePassword.as_view("profile_password_api"),
}

environment = {
    "create_environment":"/api/v01/environment/create","create_environment_controller": CreateEnvironment.as_view("create_environment_api"),
    "show_environment":"/api/v01/environment/show","show_environment_controller": ShowEnvironment.as_view("show_environment_api"),
    "remove_environment":"/api/v01/environment/remove","remove_environment_controller": RemoveEnvironment.as_view("remove_environment_api"),
    "search_environment":"/api/v01/environment/search","search_environment_controller": SearchEnvironment.as_view("search_environment_api"),
    "manage_users_environment":"/api/v01/environment/manage/<id>","manage_users_controller": ManageUsers.as_view("manage_users_api"),
    "manage_users_remove_environment":"/api/v01/environment/manage/remove","manage_users_remove_controller": ManageUsersRemove.as_view("manage_users_remove_api"),
    "manage_join_by_code_environment":"/api/v01/environment/code","manage_join_by_code_controller": JoinByCode.as_view("manage_join_by_code_api"),
    "manage_search_environment":"/api/v01/environment/manage/search","manage_search_controller": SearchManage.as_view("manage_search_api"),
    "manage_send_email_environment":"/api/v01/environment/manage/send","manage_send_email_controller": SendMailCollaborators.as_view("manage_send_email_api"),
    "manage_change_status_environment":"/api/v01/environment/manage/status","manage_change_status_controller": ChangeStatus.as_view("manage_change_status_api"),
}

main = {
    "environment_main":"/api/v01/environment/main","environment_main_controller": Main_bringEnvironmentData.as_view("main_api"),
    "register_client_main":"/api/v01/environment/main/registerclient","main_register_client_controller": Main_RegisterClient.as_view("main_register_client_api"),
    "consult_client_main":"/api/v01/environment/main/consultclient","main_consult_client_controller": Main_ConsultClient.as_view("main_consult_client_api"),
}

device = {
    "count_device":"/api/v01/device/count","count_device_controllers": CountDevice.as_view("count_device_api"),
    "device_pending":"/api/v01/device/pending","device_pending_controllers": showpending.as_view("device_pending_api"),
    "device_add":"/api/v01/create/device","device_add_controllers": createdevice.as_view("device_add_api"),
    "device_delete":"/api/v01/delete/device","device_delete_controllers": deletedevice.as_view("device_delete_api"),
    "device_more_info":"/api/v01/device/info","device_more_info_controllers": moreInfoDevice.as_view("device_more_info_api"),
    "get_device":"/api/v01/device/edit/<id>","get_device_controllers": getdevice.as_view("get_device_api"),
    "device_edit":"/api/v01/device/edit","device_edit_controllers": editDevice.as_view("device_edit_api"),
    "device_status":"/api/v01/status/device","device_status_controllers": changestatusPending.as_view("device_status_api"),
    "device_show_progress":"/api/v01/show/device/progress","device_show_progress_controllers": showDevicesInProgress.as_view("device_in_progress_api"),
    "device_more_info_progress":"/api/v01/show/device/progress/moreinfo","device_more_info_progress_controllers": moreInfoDeviceProgress.as_view("device_more_info_progress_api"),
    "device_my_dashboard_progress":"/api/v01/show/device/progress/my_dashboard","device_my_dashboard_controllers": myDashboardGet.as_view("device_my_dashboard_progress_api"),
    "device_show_repair":"/api/v01/show/device/repair","device_repair_controllers": getInfoRepair.as_view("device_repair_api"),
    "device_save_repair":"/api/v01/set/device/add","device_add_repair_controllers": saveInfoRepair.as_view("device_add_repair_api"),
    "device_change_check":"/api/v01/check/device/status","device_staus_check_controllers": changeCheckStaus.as_view("device_Stats_repair_api"),
    "client_info_device":"/api/v01/client/info/device","info_device_controllers": ClientInfoDevice.as_view("client_info_device_api"),
    "show_finished_device":"/api/v01/show/device/finished","show_finished_controllers": ShowFinished.as_view("show_finished_api"),
    "show_remove_finished_device":"/api/v01/device/remove","show_remove_finished_controllers": removeDevice.as_view("show_remove_finished_api"),
}


client = {
    "client_add":"/api/v01/create/client","client_add_controllers": createclient.as_view("client_add_api"),
    "client_edit":"/api/v01/edit/client","client_controllers": editclient.as_view("client_api"),
    "client_delete":"/api/v01/delete/client","client_delete_controllers": deleteclient.as_view("client_delete_api"),
    "client_search":"/api/v01/search/client","client_search_controllers": searchclient.as_view("client_search_api"),
    "client_show":"/api/v01/show/client","client_show_controllers": showClients.as_view("client_show_api"),
    "client_search":"/api/v01/search/client","client_search_controllers": searchClient.as_view("client_search_api"),
    "client_history":"/api/v01/history/client","client_history_controllers": showHistory.as_view("client_history_api"),
    "client_verfification":"/api/v01/verification/client","client_verfification_controllers": consultClient.as_view("client_verfification_api"),
}
