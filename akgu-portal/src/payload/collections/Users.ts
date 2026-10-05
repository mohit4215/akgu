import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor',        value: 'editor' },
      ],
      access: {
        // Only admins can change role
        update: ({ req }) => {
          const user = req.user as { role?: string } | null
          return user?.role === 'admin'
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
  ],
  access: {
    read:   ({ req }) => Boolean(req.user),
    create: ({ req }) => {
      const user = req.user as { role?: string } | null
      return user?.role === 'admin'
    },
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => {
      const user = req.user as { role?: string } | null
      return user?.role === 'admin'
    },
  },
}
