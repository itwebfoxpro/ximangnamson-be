module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      device: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );

  Note.associate = function (models) {
    Note.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  };

  return Note;
};
