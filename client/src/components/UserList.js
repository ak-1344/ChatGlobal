const UserList = ({ users }) => (
    <div style={{ width: '150px', borderRight: '1px solid gray' }}>
      <h4>Users</h4>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
  
  export default UserList;
  