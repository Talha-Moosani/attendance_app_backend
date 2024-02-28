import ActualSyllabus from "./ActualSyllabus";
import AttendanceStudents from "./AttendanceStudent";
import AttendanceTeachers from "./AttendanceTeacher";
import AttendanceType from "./AttendanceType";
import Class from "./Classes";
import ExpectedSyllabus from "./ExpectedSyllabus";
import Student from "./Student";
import Studying from "./Studying";
import Subject from "./Subject";
import Teacher from "./Teacher";
import Teaching from "./Teaching";
import User from "./User";
import UserType from "./UserType";

User.belongsTo(UserType, {foreignKey: "user_type_id", as: "user_type"})

UserType.hasMany(User, { foreignKey: 'user_type_id' });

Studying.belongsTo(Class, {foreignKey: "class_id"})


Class.hasMany(Studying,{foreignKey:"class_id"})

Student.hasMany(Studying,{foreignKey:'student_id'})

Studying.belongsTo(Student, {foreignKey: "student_id"})

Studying.belongsTo(Class, {foreignKey: "class_id"})


Teacher.hasMany(Teaching,{foreignKey:'teacher_id'})

Subject.hasOne(Teaching,{foreignKey:'subject_id'})

Class.hasMany(Teaching,{foreignKey:'class_id'})

Teaching.belongsTo(Teacher,{foreignKey: "teacher_id"})

Teaching.belongsTo(Class,{foreignKey: "class_id"})

Teaching.belongsTo(Subject,{foreignKey: "subject_id"})


AttendanceStudents.belongsTo(AttendanceType,{foreignKey:'attendance_id'})

AttendanceStudents.belongsTo(Subject,{foreignKey:'subject_id'})


AttendanceType.hasMany(AttendanceStudents,{foreignKey:'attendance_id'})

AttendanceType.hasMany(AttendanceTeachers,{foreignKey:'attendance_id'})


AttendanceTeachers.belongsTo(Subject,{foreignKey:'subject_id'})

AttendanceTeachers.belongsTo(Teacher,{foreignKey:'teacher_id'})

ExpectedSyllabus.belongsTo(Subject,{foreignKey:'subject_id'})

ActualSyllabus.belongsTo(Subject,{foreignKey:'subject_id'})

Subject.hasMany(ExpectedSyllabus,{foreignKey:'subject_id'})

Subject.hasMany(ActualSyllabus,{foreignKey:'subject_id'})
