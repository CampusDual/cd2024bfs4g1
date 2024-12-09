drop view public.v_recent_employment_status;

CREATE OR REPLACE VIEW public.v_recent_employment_status
AS SELECT DISTINCT ON (esh.student_id) esh.student_id,
    esh.employment_status_id AS v_employment_status_id,
    es.situation AS employment_status
   FROM employment_status_history esh
     JOIN employment_status es ON esh.employment_status_id = es.id
  ORDER BY esh.student_id, esh.status_date_change DESC;

create or replace view v_students_with_bootcamps as
SELECT
st.*,uu.*,ss.status,vres.employment_status,vres.v_employment_status_id,concat(concat('|',string_agg(sb.bootcamp_id::text,'|')),'|') bootcamps_id
FROM
students st
left join usr_user uu ON st.user_id = uu.usr_id
left join employment_status es on st.employment_status_id = es.id
left join student_status ss on st.student_status_id = ss.id
left join v_recent_employment_status vres on st.id = vres.student_id
left join student_bootcamp sb on sb.student_id =st.id
group by st.id,ss.status,vres.employment_status,vres.v_employment_status_id,uu.usr_id;