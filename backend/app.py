from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

from models.conexion import *

from route.routes import *

CORS(app, resources={r"/*": {"origins": "*"}})

# users 
app.add_url_rule(users["create_user"], view_func=users["create_user_controllers"])
app.add_url_rule(users["Login_user"], view_func=users["login_user_controllers"])
app.add_url_rule(users["validate_account_user"], view_func=users["validate_account"])
app.add_url_rule(users["recover_email_user"], view_func=users["recover_email"])
app.add_url_rule(users["recover_password_user"], view_func=users["recover_password"])
app.add_url_rule(users["modification_password_user"], view_func=users["modification_password"])
app.add_url_rule(users["authorization_user"], view_func=users["authorization_user_controller"])

    #-profile
app.add_url_rule(users["editProfile_user"], view_func=users["editprofile_user_controller"])
app.add_url_rule(users["profile_img"], view_func=users["profile_img_controller"])
app.add_url_rule(users["profile_name"], view_func=users["profile_name_controller"])
app.add_url_rule(users["profile_change_password"], view_func=users["profile_change_password_controller"])

# work_environment
app.add_url_rule(environment["create_environment"], view_func=environment["create_environment_controller"])
app.add_url_rule(environment["show_environment"], view_func=environment["show_environment_controller"])
app.add_url_rule(environment["remove_environment"], view_func=environment["remove_environment_controller"])
app.add_url_rule(environment["search_environment"], view_func=environment["search_environment_controller"])
    #- Manage_Users
app.add_url_rule(environment["manage_users_environment"], view_func=environment["manage_users_controller"])
app.add_url_rule(environment["manage_users_remove_environment"], view_func=environment["manage_users_remove_controller"])
app.add_url_rule(environment["manage_join_by_code_environment"], view_func=environment["manage_join_by_code_controller"])
app.add_url_rule(environment["manage_search_environment"], view_func=environment["manage_search_controller"])
app.add_url_rule(environment["manage_send_email_environment"], view_func=environment["manage_send_email_controller"])
app.add_url_rule(environment["manage_change_status_environment"], view_func=environment["manage_change_status_controller"])

# Main_environment
app.add_url_rule(main["environment_main"], view_func=main["environment_main_controller"])
app.add_url_rule(main["register_client_main"], view_func=main["main_register_client_controller"])
app.add_url_rule(main["consult_client_main"], view_func=main["main_consult_client_controller"])

#divice
app.add_url_rule(device["count_device"], view_func=device["count_device_controllers"])
app.add_url_rule(device["device_pending"], view_func=device["device_pending_controllers"])
app.add_url_rule(device["device_add"], view_func=device["device_add_controllers"])
app.add_url_rule(device["device_delete"], view_func=device["device_delete_controllers"])
app.add_url_rule(device["device_more_info"], view_func=device["device_more_info_controllers"])
app.add_url_rule(device["get_device"], view_func=device["get_device_controllers"])
app.add_url_rule(device["device_edit"], view_func=device["device_edit_controllers"])
app.add_url_rule(device["device_status"], view_func=device["device_status_controllers"])
    #device show current devices 
app.add_url_rule(device["device_show_progress"], view_func=device["device_show_progress_controllers"])
app.add_url_rule(device["device_more_info_progress"], view_func=device["device_more_info_progress_controllers"])
app.add_url_rule(device["device_my_dashboard_progress"], view_func=device["device_my_dashboard_controllers"])
app.add_url_rule(device["device_show_repair"], view_func=device["device_repair_controllers"])
app.add_url_rule(device["device_save_repair"], view_func=device["device_add_repair_controllers"])
app.add_url_rule(device["device_change_check"], view_func=device["device_staus_check_controllers"])
app.add_url_rule(device["client_info_device"], view_func=device["info_device_controllers"])
app.add_url_rule(device["show_finished_device"], view_func=device["show_finished_controllers"])

app.add_url_rule(device["show_remove_finished_device"], view_func=device["show_remove_finished_controllers"])

#client
app.add_url_rule(client["client_add"], view_func=client["client_add_controllers"])
app.add_url_rule(client["client_edit"], view_func=client["client_controllers"])
app.add_url_rule(client["client_delete"], view_func=client["client_delete_controllers"])
app.add_url_rule(client["client_search"], view_func=client["client_search_controllers"])

app.add_url_rule(client["client_show"], view_func=client["client_show_controllers"])
app.add_url_rule(client["client_search"], view_func=client["client_search_controllers"])
app.add_url_rule(client["client_history"], view_func=client["client_history_controllers"])
app.add_url_rule(client["client_verfification"], view_func=client["client_verfification_controllers"])

if __name__ == "__main__":
    app.run(debug=True, port=5000)