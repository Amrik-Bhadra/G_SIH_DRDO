import cron from "node-cron";

const scheduleCronJob = (cronExpression, taskFunction) => {
  if (!cron.validate(cronExpression)) {
    console.error("Invalid cron expression");
    return;
  }

  const task = cron.schedule(cronExpression, () => {
    console.log(`Running task at: ${new Date()}`);
    taskFunction(); // Execute the task function
  });

  console.log(`Cron job scheduled with expression: ${cronExpression}`);
  return task;
};

module.exports = { scheduleCronJob };
