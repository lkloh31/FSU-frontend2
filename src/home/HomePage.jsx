import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";

export default function HomePage() {
  // const { token } = useAuth();

  // const {
  //   data: admin,
  //   loading: adminLoading,
  //   error: adminError,
  // } = useQuery("/admin/me", "admin");

  // if (adminLoading) return <div>Loading...</div>;
  // if (adminError) return <div>Error loading admin account: {adminError}</div>;

  return (
    <>
      <h1 className="home-title">Welcome to Elemental Academy, </h1>
      {/* {token && <strong>{admin?.username}...</strong>} */}
      <h2 className="home-subtitle">Where knowledge meets elements</h2>
    <div className="home-description">
      <p>
        In a world where knowledge flows like water, stands strong like earth,
        dances like air, and blazes with passion like fire, Elemental Academy
        stands as a beacon of balance, wisdom, and mastery.

        Here, students from every nation—Northern Water Tribe scholars, Earth
        Kingdom strategists, Fire Nation innovators, and Air Nomad
        free-thinkers—gather to learn under the guidance of our esteemed faculty
        of elemental Masters. Whether you seek the healing arts of water, the
        resilience of rock, the precision of flame, or the freedom of wind, your
        path begins here.
        
        United in diversity. Rooted in tradition. Guided by the Avatar's legacy.
      </p>
      <p>Which element will call to you? </p>
      <p>Which path will shape your destiny?</p>
      {/* <p>Step forward, {admin?.username}. The world awaits your bending.</p> */}
    </div>
    </>
  );
}
