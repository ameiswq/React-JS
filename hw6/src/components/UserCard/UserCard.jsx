import "./UserCard.css";

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <h4 className="user-card__name">{user.name}</h4>
      <p className="user-card__line">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="user-card__line">
        <strong>City:</strong> {user.address.city || "—"}
      </p>
      {user.website && (
        <p className="user-card__line">
          <strong>Website:</strong> {user.website}
        </p>
      )}
    </div>
  );
}