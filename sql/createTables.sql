drop table if exists cycle_tracker;

create table cycle_tracker (
  
 id serial primary key,
 cycle_name varchar(255),
 cycle_duration_days varchar(255),
  cycle_start_date timestamp default current_timestamp
  );