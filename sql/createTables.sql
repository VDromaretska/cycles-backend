drop table if exists cycle_tracker;

create table cycle_tracker (
  
 id serial primary key,
 name varchar(255),
 duration_days varchar(255),
start_date timestamp default current_timestamp,
avatar_url varchar(255)
  );
  insert into cycle_tracker (name, duration_days, start_date, avatar_url)
values ('Changing bedsheets', 7, '2023-09-03 00:00:00',"https://cdn-icons-png.flaticon.com/512/2283/2283945.png" );
insert into cycle_tracker (name, duration_days, start_date, avatar_url)
values ('Window cleaning', 14, '2023-09-03 00:00:00', "https://cdn-icons-png.flaticon.com/512/8633/8633881.png");

insert into cycle_tracker (name, duration_days, start_date, avatar_url)
values ('Deep clean dishwasher', 30, '2023-08-18 00:00:00', "https://cdn-icons-png.flaticon.com/512/2564/2564222.png");
insert into cycle_tracker (name, duration_days, start_date, avatar_url)
values ('Deep clean bathroom', 14, '2023-08-18 00:00:00', "https://cdn-icons-png.flaticon.com/512/3130/3130313.png" );

insert into cycle_tracker (name, duration_days, start_date, avatar_url)
values ('Deep clean kitchen', 14, '2023-08-18 00:00:00', "https://cdn-icons-png.flaticon.com/512/2851/2851945.png");
