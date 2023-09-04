drop table if exists cycle_tracker;

create table cycle_tracker (
  
 id serial primary key,
 cycle_name varchar(255),
 cycle_duration_days varchar(255),
  cycle_start_date timestamp default current_timestamp
  );
  insert into cycle_tracker (cycle_name, cycle_duration_days, cycle_start_date)
values ('Changing bedsheets', 7, '2023-09-03 00:00:00');

insert into cycle_tracker (cycle_name, cycle_duration_days, cycle_start_date)
values ('Deep clean dishwasher', 30, '2023-08-18 00:00:00');