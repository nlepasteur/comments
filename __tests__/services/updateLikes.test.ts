import type { Like } from 'types';

import { updateLikes } from '../../src/services/likes.service';

const stubLikes: Like[] = [
  {
    user: {
      projects_count: 15,
      followers_count: 1500,
      followed: false,
      plus_member: false,
      id: 0,
      username: 'TL',
      full_name: 'tlaw',
      headline: 'VFX artist',
      medium_avatar_url: '',
      pro_member: false,
    },
    id: 1000,
    user_id: 100,
    votable_id: 13,
    created_at: '',
  },
  {
    user: {
      projects_count: 3,
      followers_count: 124,
      followed: false,
      plus_member: false,
      id: 101,
      username: 'Barry W.',
      full_name: 'barryw',
      headline: 'designer',
      medium_avatar_url: '',
      pro_member: false,
    },
    id: 1001,
    user_id: 101,
    votable_id: 13,
    created_at: '',
  },
];

describe('updateLikes', () => {
  it('should toggle followed property', () => {
    const result = updateLikes(0)(stubLikes);
    expect(result[0].user.followed).toBeTruthy();
  });
});
