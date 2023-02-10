import {
  daoGroups,
  daoMembers,
  announcements,
  proposals,
  votes,
  transactions,
  profiles,
} from "../fakeData.json";

export const resolvers = {
  Query: {
    getAllDAOGroups: (parent: unknown, args: { daoId: string }) => {
      const { daoId } = args;
      return daoGroups.map((group: any) => ({
        ...group,
        members: daoMembers.filter((member: any) =>
          member.daos.includes(group.address)
        ),
      }));
    },
    getMembershipInfo: (
      parent: unknown,
      args: { daoId: string; groupIds: string[] }
    ) => {
      const { daoId, groupIds } = args;
      const members = daoMembers.filter((member: { daos: string[] }) =>
        member.daos.some((groupId: string) => groupIds.includes(groupId))
      );

      return {
        members: members.length,
        approveds: members.filter(({ status }: any) => status === "approved")
          .length,
        pendings: members.filter(({ status }: any) => status === "pending")
          .length,
        rejecteds: members.filter(({ status }: any) => status === "rejected")
          .length,
        dayChanges: 2.45,
      };
    },
    getAnnouncements: (
      parent: unknown,
      args: { daoId: any; groupIds: any; filterBy: any; limit: any }
    ) => {
      const { daoId, groupIds, filterBy, limit } = args;
      return announcements
        .filter((announcement: { groupId: any }) =>
          groupIds.includes(announcement.groupId)
        )
        .sort(
          (
            a: {
              createdAt: string | number | Date;
              updatedAt: string | number | Date;
              replies: number;
            },
            b: {
              createdAt: string | number | Date;
              updatedAt: string | number | Date;
              replies: number;
            }
          ) => {
            switch (filterBy) {
              case "newest":
              default:
                return new Date(a.createdAt).getTime() <
                  new Date(b.createdAt).getTime()
                  ? 1
                  : -1;
              case "trending":
                return new Date(a.updatedAt).getTime() <
                  new Date(b.updatedAt).getTime()
                  ? 1
                  : -1;
              case "most_activity":
                return a.replies < b.replies ? 1 : -1;
            }
          }
        )
        .slice(0, limit)
        .map((item: { announcer: any }) => ({
          ...item,
          announcerAddress: item.announcer,
          announcerAvatar: daoMembers.find(
            (member: { address: any }) => member.address === item.announcer
          )?.avatar,
        }));
    },
    getProposals: (parent: unknown, args: { daoId: any; groupIds: any }) => {
      const { daoId, groupIds } = args;
      return proposals.filter((proposal: { groupId: any }) =>
        groupIds.includes(proposal.groupId)
      );
    },
    getVotes: (parent: unknown, args: { daoId: any; groupIds: any }) => {
      const { daoId, groupIds } = args;
      return votes.filter((vote: { groupId: any }) =>
        groupIds.includes(vote.groupId)
      );
    },
    getTransactions: (parent: unknown, args: { daoId: any; groupIds: any }) => {
      const { daoId, groupIds } = args;
      return transactions.filter((transaction: { groupId: any }) =>
        groupIds.includes(transaction.groupId)
      );
    },
    getClaimStatus: (parent: unknown, args: { daoId: any; groupIds: any }) => {
      const { daoId, groupIds } = args;
      return {
        approveds: 1124,
        pendings: 224,
        rejecteds: 14,
        disputeds: 12,
        remainings: 1,
      };
    },
    getOutcomeContractStatus: (
      parent: unknown,
      args: { daoId: any; groupIds: any }
    ) => {
      const { daoId, groupIds } = args;
      return {
        actives: 1124,
        completeds: 224,
        totalPayments: "1298",
        awardedPayments: "987",
      };
    },
    getTreasuryPools: (parent: unknown, args: { daoId: any }) => {
      const { daoId } = args;
      return {
        totalVolumeUSD: "230750",
        dayChanges: 0.14,
        assets: [
          {
            name: "ixo",
            logoUrl:
              "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/ixo.svg",
          },
          {
            name: "xusd",
            logoUrl:
              "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/xusd.svg",
          },
          {
            name: "osmo",
            logoUrl:
              "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/osmo.svg",
          },
        ],
      };
    },
    getMembers: (
      parent: unknown,
      args: {
        daoId: any;
        groupId: any;
        status: any;
        keyword: any;
        sortBy: any;
        order: any;
      }
    ) => {
      const { daoId, groupId, status, keyword, sortBy, order } = args;
      return daoMembers
        .filter(
          (member: { daos: string[]; status: string; address: string }) =>
            member.daos.includes(groupId) &&
            (!status || member.status === status) &&
            (!keyword || member.address === keyword)
        )
        .sort((a: any, b: any) => {
          switch (sortBy) {
            case "name":
            default:
              if (order === "desc") return b.name?.localeCompare(a.name);
              return a.name?.localeCompare(b.name);
            case "votingPower":
              if (order === "desc") return b.votingPower - a.votingPower;
              return a.votingPower - b.votingPower;
            case "staking":
              if (order === "desc") return b.staking - a.staking;
              return a.staking - b.staking;
            case "votes":
              if (order === "desc") return b.votes - a.votes;
              return a.votes - b.votes;
            case "proposals":
              if (order === "desc") return b.proposals - a.proposals;
              return a.proposals - b.proposals;
          }
        });
    },
    getMember: (parent: unknown, args: { address: string }) => {
      const { address } = args;
      return daoMembers.find(
        (member: { address: string }) => member.address === address
      );
    },
    getMemberProfile: (parent: unknown, args: { address: string }) => {
      const { address } = args;
      return profiles.find(
        (profile: { address: string }) => profile.address === address
      );
    },
  },
};
