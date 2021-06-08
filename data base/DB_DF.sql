create database db_datafilter; /*drop schema db_datafilter*/
use db_datafilter;

create table users
(
	id int primary key auto_increment,
	name char(100),
	surname char(100),
	email char(150) unique,
	password text,
	img text,
	activated boolean,
	code char(15),
	recovery_date datetime
);

create table environments
(
	id int primary key not null auto_increment,
    img text,
    name char(120),
    key_code char(10),
    creation_date date,
    created_by int,
    foreign key (created_by) references users(id)
);

create table bridge
(
	id int primary key not null auto_increment,
    id_user int,
    id_environments int,
    v_admin boolean,
    linking_date date,
    state boolean,
    foreign key (id_user) references users(id),
    foreign key (id_environments) references environments(id)
);

create table clients
(
	identification char(30) primary key not null,
    enviroment int,
    name Char(150),
    surname Char(150),
    email char(200),
    phone char(13),
    address Char(100),
    FOREIGN KEY (enviroment) REFERENCES environments(id)
);

create table devices
(
	id int primary key not null auto_increment,
    client char(20),
    environment int,
    user int,
    type char(60),
    model char(60),
    brand char(30),
    serial varchar(300),
    accessories text,
    conditions text,
    work_to_do Text,
    status int,
    admission_date date,
    start_process int,
    departure_date date,
    foreign key (client) references clients(identification),
    foreign key (environment) references environments(id),
    foreign key (user) references users(id),
    foreign key (start_process) references users(id)
);