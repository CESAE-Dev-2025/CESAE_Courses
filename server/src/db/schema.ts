import { mysqlTable, primaryKey, int, varchar, text, boolean } from "drizzle-orm/mysql-core"

export const courses = mysqlTable("courses", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }),
	coverUrl: varchar("cover_url", { length: 255 }),
	startDate: varchar("start_date", { length: 50 }),
	endDate: varchar("end_date", { length: 50 }),
	time: varchar({ length: 100 }),
	timeDescription: varchar("time_description", { length: 100 }),
	duration: varchar({ length: 50 }),
	regime: varchar({ length: 100 }),
	location: varchar({ length: 255 }),
	description: text(),
	audience: text(),
	requirements: text(),
	project: varchar({ length: 255 }),
	price: varchar({ length: 50 }),
	benefits: text(),
	goals: text(),
	sponsorImgUrl: varchar("sponsor_img_url", { length: 255 }),
	courseContent: text("course_content"),
	enrollment: varchar({ length: 255 }),
	hasDownloadButton: boolean("has_download_button"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "courses_id"}),
]);
