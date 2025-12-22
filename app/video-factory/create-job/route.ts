export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const payload = await request.json();

        if (!payload?.topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }
        
        // 1. Create Job and get the Job Object
        const job = await createNewJob({ ...payload, userId });
        
        // ✅ FIX: Extract the string ID from the object
        const jobId = job.id; 
        
        // 2. Start the process using the string ID
        generateProcess(jobId);

        // 3. Return the string ID to the frontend
        return NextResponse.json({ jobId }, { status: 202 });

    } catch (e: any) {
        console.error("Error queuing job:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}