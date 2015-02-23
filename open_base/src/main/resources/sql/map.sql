CREATE TABLE IF NOT EXISTS MAP (
	id integer NOT NULL AUTO_INCREMENT,
	latitude float,
	longitude float,
	title varchar(200),
	address varchar(500),
	comment varchar(2000),
	display_flag char(1) not null default 'N',
	reg_id varchar(100),
	reg_date datetime,
	mod_id varchar(100),
	mod_date datetime,
	CONSTRAINT map_id PRIMARY KEY(id)
);
