import { useEffect, useState } from "react";
import Success from "./components/Success";
import Users from "./components/Users";

function App() {
  const url = "https://reqres.in/api/users";
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serachInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onClickInvited = (id) => {
    if (invites.includes(id)) {
      setInvites([...invites].filter((invitedId) => invitedId !== id));
    } else {
      setInvites([...invites, id]);
    }
  };

  const onClickSuccessButton = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          serachInput={serachInput}
          onChangeSearchInput={setSearchInput}
          items={users}
          isLoading={isLoading}
          onClickInvited={onClickInvited}
          invites={invites}
          onClickSuccessButton={onClickSuccessButton}
        />
      )}
    </div>
  );
}

export default App;
