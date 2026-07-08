const { connectDB, collections } = require('./config/db');

async function migrate() {
  console.log("Connecting to Database...");
  await connectDB();
  console.log("Connected successfully. Fetching projects...");

  const projects = await collections.projectCol.find({}).toArray();
  console.log(`Found ${projects.length} projects. Starting migration...`);

  let migratedCount = 0;
  for (const project of projects) {
    if (project.activitiesID && typeof project.activitiesID === 'string') {
      // Convert single string activitiesID to array
      await collections.projectCol.updateOne(
        { _id: project._id },
        { $set: { activitiesID: [project.activitiesID] } }
      );
      migratedCount++;
      console.log(`Migrated project "${project.name}" (${project._id}): activitiesID from string to array.`);
    } else if (!project.activitiesID) {
      // Initialize empty array if field doesn't exist
      await collections.projectCol.updateOne(
        { _id: project._id },
        { $set: { activitiesID: [] } }
      );
      migratedCount++;
      console.log(`Initialized empty activitiesID array for project "${project.name}" (${project._id}).`);
    } else {
      console.log(`Project "${project.name}" (${project._id}) already has an array or invalid field.`);
    }
  }

  console.log(`Migration finished. Modified ${migratedCount} projects.`);
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
