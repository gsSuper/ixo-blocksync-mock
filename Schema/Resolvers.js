const {
  daoGroups,
  daoMembers,
  announcements,
  proposals,
  votes,
  transactions,
  profiles,
} = require("../fakeData.json");

const resolvers = {
  Query: {
    getAllDAOGroups: (parent, args) => {
      const { daoId } = args;
      return daoGroups.map((group) => ({
        ...group,
        members: daoMembers.filter((member) =>
          member.daos.includes(group.address)
        ),
      }));
    },
    getMembershipInfo: (parent, args) => {
      const { daoId, groupIds } = args;
      const members = daoMembers.filter((member) =>
        member.daos.some((groupId) => groupIds.includes(groupId))
      );

      return {
        members: members.length,
        approveds: members.filter(({ status }) => status === "approved").length,
        pendings: members.filter(({ status }) => status === "pending").length,
        rejecteds: members.filter(({ status }) => status === "rejected").length,
        dayChanges: 2.45,
      };
    },
    getAnnouncements: (parent, args) => {
      const { daoId, groupIds, filterBy, limit } = args;
      return announcements
        .filter((announcement) => groupIds.includes(announcement.groupId))
        .sort((a, b) => {
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
        })
        .slice(0, limit)
        .map((item) => ({
          ...item,
          announcerAddress: item.announcer,
          announcerAvatar: daoMembers.find(
            (member) => member.address === item.announcer
          )?.avatar,
        }));
    },
    getProposals: (parent, args) => {
      const { daoId, groupIds } = args;
      return proposals.filter((proposal) =>
        groupIds.includes(proposal.groupId)
      );
    },
    getVotes: (parent, args) => {
      const { daoId, groupIds } = args;
      return votes.filter((vote) => groupIds.includes(vote.groupId));
    },
    getTransactions: (parent, args) => {
      const { daoId, groupIds } = args;
      return transactions.filter((transaction) =>
        groupIds.includes(transaction.groupId)
      );
    },
    getClaimStatus: (parent, args) => {
      const { daoId, groupIds } = args;
      return {
        approveds: 1124,
        pendings: 224,
        rejecteds: 14,
        disputeds: 12,
        remainings: 1,
      };
    },
    getOutcomeContractStatus: (parent, args) => {
      const { daoId, groupIds } = args;
      return {
        actives: 1124,
        completeds: 224,
        totalPayments: "1298",
        awardedPayments: "987",
      };
    },
    getTreasuryPools: (parent, args) => {
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
    getMembers: (parent, args) => {
      const { daoId, groupId, status, keyword, sortBy, order } = args;
      return daoMembers
        .filter(
          (member) =>
            member.daos.includes(groupId) &&
            (!status || member.status === status) &&
            (!keyword || member.address === keyword)
        )
        .sort((a, b) => {
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
    getMember: (parent, args) => {
      const { address } = args;
      return daoMembers.find((member) => member.address === address);
    },
    getMemberProfile: (parent, args) => {
      const { address } = args;
      return profiles.find((profile) => profile.address === address);
    },
  },
};

module.exports = { resolvers };
