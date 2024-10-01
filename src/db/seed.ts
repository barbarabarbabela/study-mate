import { client, db } from ".";
import { studyCycles, studyCycleSubjects, subjects, users } from "./schema";

async function seed() {
  await db.delete(subjects);
  await db.delete(users);
  await db.delete(studyCycles);
  await db.delete(studyCycleSubjects);

  const userResult = await db
    .insert(users)
    .values([
      {
        name: "Barbara",
        email: "barbarabarbabela@gmail.com",
        password: "123456",
      },
    ])
    .returning();

  const subjectResults = await db
    .insert(subjects)
    .values([{ name: "React.js" }, { name: "Microservices" }, { name: "SQL" }])
    .returning();

  const studyCycleResult = await db
    .insert(studyCycles)
    .values([
      {
        name: "Programação Intermediária",
        startDate: new Date(), // Usar a data atual como exemplo
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Definir endDate para 30 dias a partir de agora
        completed: 0,
        totalHours: 10,
        userId: 1,
      },
    ])
    .returning();

  const subjectIds = subjectResults.map((subject) => subject.id);

  await db.insert(studyCycleSubjects).values([
    {
      studyCycleId: studyCycleResult[0].id,
      subjectId: subjectIds[0],
      subjectWeight: 1,
    },
    {
      studyCycleId: studyCycleResult[0].id,
      subjectId: subjectIds[1],
      subjectWeight: 2,
    },
    {
      studyCycleId: studyCycleResult[0].id,
      subjectId: subjectIds[2],
      subjectWeight: 1,
    },
  ]);
}

seed().finally(() => client.end());
