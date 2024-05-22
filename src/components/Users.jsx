import Skeleton from "./Skeleton";
import User from "./User";

const Users = ({
  items,
  isLoading,
  serachInput,
  onChangeSearchInput,
  onClickInvited,
  invites,
  onClickSuccessButton,
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={serachInput}
          onChange={(e) => onChangeSearchInput(e.target.value)}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items.map((obj) => {
            const fullNameInLowerCase = (
              obj.first_name +
              " " +
              obj.last_name
            ).toLowerCase();
            const emailInLowerCase = obj.email.toLowerCase();
            if (
              !fullNameInLowerCase.includes(serachInput.trim().toLowerCase()) &&
              !emailInLowerCase.includes(serachInput.trim().toLowerCase())
            ) {
              return;
            }
            return (
              <User
                isInvited={invites.includes(obj.id)}
                onClickInvited={onClickInvited}
                key={obj.id}
                {...obj}
              />
            );
          })}
        </ul>
      )}
      {invites.length > 0 ? (
        <button onClick={onClickSuccessButton} className="send-invite-btn">
          Отправить приглашение
        </button>
      ) : (
        <button
          style={{ opacity: 0.4, cursor: "not-allowed" }}
          disabled={true}
          onClick={onClickSuccessButton}
          className="send-invite-btn"
        >
          Отправить приглашение
        </button>
      )}
    </>
  );
};

export default Users;
