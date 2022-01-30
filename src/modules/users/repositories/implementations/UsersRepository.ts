import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const findUser = this.users.find((user) => {
      return user.id === id;
    });

    if (findUser) {
      return findUser;
    }

    return undefined;
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find((user) => {
      return user.email === email;
    });

    if (findUser) {
      return findUser;
    }

    return undefined;
  }

  turnAdmin(receivedUser: User): User {
    Object.assign(receivedUser, {
      admin: true,
    });

    this.users.map(async (user) => {
      if (user.id === receivedUser.id) {
        user.admin = true;
      }
    });

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
