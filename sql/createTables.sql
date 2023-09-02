drop table if exists task_tracker;

create table task_tracker (
  
 id serial primary key,
 task_name varchar(255),
 cycle_duration varchar(255),
  start_date timestamp default current_timestamp
  );