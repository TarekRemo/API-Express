import {sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import {randomUUID} from "crypto";

export const questions = sqliteTable('questions', {
    id: text().
        primaryKey().
        $defaultFn(() => randomUUID() ),

    questionText: text('question_text', {length: 255}).
                    notNull(),

    answer: text({length: 255}).notNull(),

    difficulty: text({enum: ['easy', 'medium', 'difficult']}).notNull().default('easy'),

    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn( () => new Date()),

    createdBy: text('created_by')
                .references(() => users.id, {onDelete: 'cascade'})
                .notNull()

});

export const users = sqliteTable('users', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    email: text().notNull().unique(),
    username: text({length: 30}).notNull().unique(),
    password: text({length: 255}).notNull(),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn( () => new Date())
}); 