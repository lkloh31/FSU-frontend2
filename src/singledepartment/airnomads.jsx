import airImg from "/images/air.png";

export default function AirNomads() {
  return (
    <div className="single-department-page air-nomads">
      <div className="single-department-header">
        <img src={airImg} alt="Air Nomads symbol" className="department-icon" />
        <h2>Air Nomads</h2>
      </div>
      <p>
        The Air Nomads were peaceful and spiritual people. They value freedom, harmony with nature, and inner balance. 
        Known for their connection to the Avatar cycle and the teachings of monks like Aang and Gyatso.
      </p>
    </div>
  );
}