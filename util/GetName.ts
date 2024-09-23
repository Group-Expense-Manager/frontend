import { GroupMemberDetails } from '@/hooks/userdetails/UseGroupMembersDetails';
import { UserDetails } from '@/hooks/userdetails/UseUserDetails';

export function getName(firstName?: string, lastName?: string): string | undefined {
  switch (true) {
    case !!firstName && !!lastName:
      return `${firstName} ${lastName}`;
    case !!firstName:
      return firstName;
    case !!lastName:
      return lastName;
    default:
      return undefined;
  }
}

export function getNameFromUserDetails(userDetails: UserDetails | GroupMemberDetails): string {
  const name = getName(userDetails.firstName, userDetails.lastName);
  return name ? name : userDetails.username;
}

export function getFirstNameOrUsername(userDetails: GroupMemberDetails): string {
  return userDetails.firstName ? userDetails.firstName : userDetails.username;
}
