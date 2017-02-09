# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.


ActiveRecord::Schema.define(version: 20170209035714) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string   "concept",                   null: false
    t.integer  "game_id",                   null: false
    t.integer  "author_id",                 null: false
    t.boolean  "in_bowl",    default: true, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "cards_turns", id: false, force: :cascade do |t|
    t.integer  "card_id",    null: false
    t.integer  "turn_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.string   "name",                      null: false
    t.integer  "creator_id",                null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.boolean  "is_paused",  default: true
    t.index ["name"], name: "index_games_on_name", unique: true, using: :btree
  end

  create_table "games_participants", force: :cascade do |t|
    t.integer "game_id",        null: false
    t.integer "participant_id", null: false
    t.index ["game_id", "participant_id"], name: "index_games_participants_on_game_id_and_participant_id", unique: true, using: :btree
  end

  create_table "players_teams", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "team_id",   null: false
    t.index ["player_id", "team_id"], name: "index_players_teams_on_player_id_and_team_id", unique: true, using: :btree
  end

  create_table "round_types", force: :cascade do |t|
    t.string "name",        null: false
    t.string "description", null: false
  end

  create_table "rounds", force: :cascade do |t|
    t.integer "game_id",                       null: false
    t.integer "round_type_id",                 null: false
    t.boolean "is_over",       default: false
  end

  create_table "teams", force: :cascade do |t|
    t.string  "name",                null: false
    t.integer "score",   default: 0, null: false
    t.integer "game_id",             null: false
  end

  create_table "turns", force: :cascade do |t|
    t.integer  "player_id"
    t.integer  "round_id"
    t.integer  "seconds_remaining", default: 60, null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "display_name",    null: false
    t.string   "email",           null: false
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["display_name"], name: "index_users_on_display_name", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

end
