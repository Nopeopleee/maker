const ReportsExample = {
  items: [
    {
      id: 1,
      form_id: 1,
      member_id: 1,
      created_at: '2024-09-19T09:47:51.453Z',
      updated_at: '2024-09-19T09:47:51.453Z',
      member: {
        name: 'abc',
      },
      'ans-1': 'abc',
    },
  ],
  data_count: 1,
  head: [
    {
      id: 'member.name',
      numeric: false,
      disablePadding: false,
      disableSorting: true,
      label: 'reports.name',
      link: false,
    },
    {
      id: 'ans-1',
      numeric: false,
      disablePadding: false,
      disableSorting: true,
      label: 'title',
      link: false,
    },
  ],
};

export default ReportsExample;
