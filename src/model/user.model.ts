import { PatchUserDto } from './../dto/user.dto';
import { CreateUserDto } from '@/dto/user.dto';
import QueryDB from '@/provider/db.provider';
import bcrypt from 'bcrypt';

class UserModel {
  public async createUser(user: CreateUserDto) {
    console.log('usermodel');
    user.password = await bcrypt.hash(user.password, 13);
    return await QueryDB(
      `INSERT into users (${Object.keys(user).join(',')}) values(${Array.from({ length: Object.keys(user).length }).map(() => '?')})`,
      [...Object.values(user)],
    );
  }
  public async updateUser(user: PatchUserDto, id: string) {
    const query = `Update users set ${Object.entries(user).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
    return await QueryDB(query, [id]);
  }

  public async getUser(userid: string) {
    return QueryDB('Select first_name, last_name, email,id from users where id = ?', [userid]);
  }
  public async getAllUsers() {
    return QueryDB('Select first_name, last_name, email,id from users');
  }

  public async deleteUser(userid: string) {
    return QueryDB('Delete from users where id = ?', [userid]);
  }
}

export default new UserModel();
