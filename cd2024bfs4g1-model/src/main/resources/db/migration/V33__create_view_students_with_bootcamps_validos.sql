drop view v_students_with_bootcamps;

create or replace view v_students_with_bootcamps as
select
st.*,
uu.*,
ss.status,
vres.employment_status,
vres.v_employment_status_id,
concat(concat('|', string_agg(sb.bootcamp_id::text, '|')), '|') bootcamps_id,
bot_activ.validos
from
students st
left join usr_user uu on
st.user_id = uu.usr_id
left join employment_status es on
st.employment_status_id = es.id
left join student_status ss on
st.student_status_id = ss.id
left join v_recent_employment_status vres on
st.id = vres.student_id
left join student_bootcamp sb on
sb.student_id = st.id
left join (
select
count(*) validos ,
sb.student_id
from
student_bootcamp sb
join bootcamps b on
b.id = sb.bootcamp_id
where
b.end_date >= current_date
group by
sb.student_id
)bot_activ on
st.id = bot_activ.student_id
group by
st.id,
ss.status,
vres.employment_status,
vres.v_employment_status_id,
uu.usr_id,
bot_activ.student_id,
bot_activ.validos;