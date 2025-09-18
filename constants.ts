
export const FAQ_DATA = `
Q: What is "Project Aurora"?
A: Project Aurora is our next-generation platform for cloud data analytics. It's designed to be faster, more scalable, and more secure than any other solution on the market. It integrates machine learning capabilities directly into the data pipeline.

Q: What are the key features of Project Aurora?
A: The key features include:
1.  Real-time data processing with sub-second latency.
2.  Auto-scaling infrastructure that adjusts to your workload.
3.  A user-friendly drag-and-drop interface for building data pipelines.
4.  Built-in AI/ML models for predictive analytics.
5.  End-to-end encryption for all data, both at rest and in transit.

Q: Who is the target audience for Project Aurora?
A: The primary audience is data scientists, business analysts, and enterprise IT departments who need to process and analyze large volumes of data quickly and efficiently.

Q: When will Project Aurora be released?
A: Project Aurora is currently in a closed beta with select partners. We are planning a public launch in the fourth quarter of this year.

Q: How can I get access to the beta?
A: You can apply for the beta program on our official website. Please note that spots are limited, and we are prioritizing applicants whose use cases align with our testing goals.

Q: What is the pricing model for Project Aurora?
A: We will offer a tiered pricing model based on data volume and feature usage. There will be a free tier for developers and small teams, a standard plan for businesses, and an enterprise plan with custom pricing and dedicated support. Full pricing details will be available at launch.

Q: What technologies does Project Aurora use?
A: It is built on a modern stack including Kubernetes for orchestration, Apache Flink for stream processing, and our own proprietary machine learning framework. The frontend is built with React.

Q: How is Project Aurora different from its competitors?
A: Our main differentiators are the deep integration of AI/ML, the exceptional performance for real-time workloads, and our commitment to an intuitive user experience that lowers the barrier to entry for advanced data analytics.
`;

export const SYSTEM_INSTRUCTION = `
You are a friendly and helpful FAQ chatbot for a product called "Project Aurora".
Your knowledge is strictly limited to the provided text below.
If a user asks a question that is not covered in the text, you must politely state that you don't have that information and cannot answer questions outside of the provided context.
Do not invent answers or seek information from outside this document.
Keep your answers concise and directly based on the provided information.

Here is the information you must use:
---
${FAQ_DATA}
---
`;
