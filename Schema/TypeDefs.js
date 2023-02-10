const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type DAOMember {
    avatar: String
    name: String
    address: String!
    role: String
    votingPower: Float!
    staking: Int!
    votes: Int!
    proposals: Int!
    status: String!
    verified: Boolean
    administrator: Boolean
    assignedAuthority: Float
    daos: [String]
    projects: [String]
    investments: [String]
    assets: [String]
  }
  type DAOGroup {
    address: String!
    type: String!
    title: String
    # description: String
    members: [DAOMember]
  }
  type DAOGroupMembership {
    members: Int
    approveds: Int
    pendings: Int
    rejecteds: Int
    dayChanges: Float
  }

  type DAOAnnouncement {
    title: String
    description: String
    announcer: String
    timestamp: String
    replies: Int
  }

  type DAOProposal {
    id: Int
    title: String
    description: String
    startDate: String
    endDate: String
  }

  type DAOVote {
    timestamp: String
    votes: Int
  }

  type DAOTransaction {
    age: String # TODO: number of milliseconds
    type: String
    purpose: String
    description: String
    value: String
    status: String
    hash: String
  }

  type DAOClaimStatus {
    approveds: Int
    pendings: Int
    rejecteds: Int
    disputeds: Int
    remainings: Int
  }

  type DAOOutcomeContractStatus {
    actives: Int
    completeds: Int
    totalPayments: String
    awardedPayments: String
  }

  type Asset {
    name: String
    logoUrl: String
  }
  type DAOTreasuryPool {
    totalVolumeUSD: String
    dayChanges: Float
    assets: [Asset]
  }
  type MemberSocial {
    linkedIn: String
    twitter: String
    github: String
  }
  type MemberAccount {
    ixo: String
    cosmos: String
  }
  type DAOMemberProfile {
    avatar: String
    name: String
    address: String
    role: String
    phoneNumber: String
    email: String
    socials: MemberSocial
    credentials: [String]
    accounts: MemberAccount
  }

  # Queries
  type Query {
    getAllDAOGroups: [DAOGroup!]
    getMembershipInfo(groupId: String): DAOGroupMembership
    getAnnouncements(groupId: String, sortBy: String): [DAOAnnouncement]
    getProposals(groupId: String): [DAOProposal]
    getVotes(groupId: String): [DAOVote]
    getTransactions(groupId: String): [DAOTransaction]
    getClaimStatus(groupId: String): DAOClaimStatus
    getOutcomeContractStatus(groupId: String): DAOOutcomeContractStatus
    getTreasuryPools(groupId: String): DAOTreasuryPool
    getMembers(
      groupId: String
      status: String
      keyword: String
      sortBy: String
      order: String
    ): [DAOMember]
    getMember(address: String): DAOMember
    getMemberProfile(address: String): DAOMemberProfile
  }
`;

module.exports = { typeDefs };
