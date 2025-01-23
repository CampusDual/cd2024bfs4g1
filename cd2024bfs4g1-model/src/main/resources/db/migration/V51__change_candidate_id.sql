DO $$
DECLARE id_one int4;
begin
--creo unestado auxiliar
insert into student_bootcamp_status (student_bootcamp_status,computable) values('candidato_fake',true);
--muevo todos los alumnos en candidato al estado auxiliar
update student_bootcamp
set status_id = (select id from student_bootcamp_status sbs where sbs.student_bootcamp_status='candidato_fake')
where status_id in (select sbs2.id
from
student_bootcamp_status sbs2
where upper(sbs2.student_bootcamp_status) = 'CANDIDATO');
--borro el estado candidato
delete from student_bootcamp_status sbs2 where upper(sbs2.student_bootcamp_status) = 'CANDIDATO';
select count(*) into id_one from student_bootcamp_status sbs2 where id=1;
if id_one > 0 then
--si existe un estado en id 1 lo muevo
--creo une stado fake manteniendo los datos
insert into student_bootcamp_status (student_bootcamp_status,computable) select concat('@soyfake@',sbf.student_bootcamp_status),computable from student_bootcamp_status sbf where id=1;
--muevo a los alumnos al nuevo estado fake
update student_bootcamp
set status_id = (select id from student_bootcamp_status sbf where sbf.student_bootcamp_status like '@soyfake@%')
where status_id = 1;
--me cargo el estado 1 antiguo para dejarlo libre
delete from student_bootcamp_status sbs2 where id=1;
--actualizo el nombre del estado fake para dejarlo como en origen
update student_bootcamp_status sbf
set student_bootcamp_status = (select SUBSTRING(student_bootcamp_status, 10) from student_bootcamp_status sbff where sbff.student_bootcamp_status like '@soyfake@%')
where id = (select id from student_bootcamp_status sbf where sbf.student_bootcamp_status like '@soyfake@%');
end if;
--muevo candidatofake a Candidato con id 1
--creo estado auxiliar
insert into student_bootcamp_status (id,student_bootcamp_status,computable) values(1,'Candidato',true);
--muevo todos los alumnos al estado 1
update student_bootcamp
set status_id = 1
where status_id in (select sbs2.id
from
student_bootcamp_status sbs2
where upper(sbs2.student_bootcamp_status) = 'CANDIDATO_FAKE');
--limpio el estado fake
delete from student_bootcamp_status sbs2 where upper(sbs2.student_bootcamp_status) = 'CANDIDATO_FAKE';
END $$;
