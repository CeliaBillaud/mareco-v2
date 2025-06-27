import { useGetAllRecosQuery } from "@/generated/graphql-types";

const HomePage = () => {
  const { data, loading, error } = useGetAllRecosQuery();

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Woops, on a tout cassé</p>;
  if (!data) return <p>Woops, on a tout cassé (should never render this)</p>;

  return (
    <div>
      <h1>Mes Recos</h1>
      {data?.getAllRecos.map((reco) => (
        <div key={reco.id}>{reco.title}</div>
      ))}
    </div>
  );
};

export default HomePage;
