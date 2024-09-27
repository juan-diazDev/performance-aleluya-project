import { WorkerData } from 'db/schema';

type workerProps = {
  workerData: Array<WorkerData>;
};

export default function Workers({ workerData }: workerProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1>Workers</h1>
      <div className="flex gap-x-3 gap-y-6 flex-wrap">
        {workerData.map((worker) => {
          if (worker.full_name === 'Juan Pablo Díaz') {
            throw new Error(`Error simulado en la card de ${worker.full_name}`);
          }

          return (
            <div
              key={worker.id}
              className="border border-cyan-500 rounded-3xl w-52"
            >
              <h2>{worker.full_name}</h2>
              <p>{worker.position}</p>
              <p>{worker.description}</p>
              <p>{worker.birth_date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
