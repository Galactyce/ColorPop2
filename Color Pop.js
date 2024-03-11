


var ID = {
  'cannon': 1,

}

var sprites = {}
var sounds = {}


powerupjs.Game.loadAssets = function () {

  var loadSprite = function (img, collisionMask) {
    return new SpriteSheet("Sprites/" + img, collisionMask);
  };


  var loadSound = function (soundName, looping) {
    return new Sound(soundName, looping)
  }

  sprites.balloons = {
    'red': { 'normal': loadSprite("balloon_red.png"), 'popped': loadSprite("red_pop_effect.png"), 'reinforced': loadSprite("balloon_red_reinforced.png") },
    'green': { 'normal': loadSprite("balloon_green.png"), 'popped': loadSprite("green_pop_effect.png"), 'reinforced': loadSprite("balloon_green_reinforced.png") },
    'blue': { 'normal': loadSprite("balloon_blue.png"), 'popped': loadSprite("blue_pop_effect.png"), 'reinforced': loadSprite("balloon_blue_reinforced.png") },
    'rainbow': { 'normal': loadSprite("rainbow_balloon.png"), "reinforced": loadSprite("reinforced_rainbow_balloon.png"), 'popped': loadSprite('rainbow_pop_effect.png') },
    'bomb': { 'normal': loadSprite("bomb_balloon.png"), 'reinforced': loadSprite("bomb_balloon_reinforced.png"), 'popped': loadSprite("black_pop_effect.png") },
    'ice': { 'normal': loadSprite("ice_balloon.png"), 'reinforced': loadSprite("ice_balloon_reinforced.png"), 'popped': loadSprite("ice_pop_effect.png") },
    'golden': { 'normal': loadSprite("golden_balloon.png") },
    'metal': { 'normal': loadSprite("lead_balloon_full.png"), 'reinforced': loadSprite("metal_balloon_full_reinforced.png"), 'popped': loadSprite('metal_pop_effect.png') },
    'metal_cracked': { 'normal': loadSprite("lead_balloon_cracked.png"), 'reinforced': loadSprite("metal_balloon_cracked_reinforced.png") },
    'metal_damaged': { 'normal': loadSprite("lead_balloon_damaged.png"), 'reinforced': loadSprite("metal_balloon_damaged_reinforced.png") },
    'hotair_red': {'closed': loadSprite("hotair_redclosed.png"), 'open': loadSprite("hotair_redopen.png")},
    'hotair_blue': {'closed': loadSprite("hotair_blueclosed.png"), 'open': loadSprite("hotair_blueopen.png")},
    'hotair_green': {'closed': loadSprite("hotair_greenclosed.png"), 'open': loadSprite("hotair_greenopen.png")},

  };


  // sprites.blimp = {
  //   'red': {'normal': loadSprite("marker_red.png")},
  //   'green': {'normal': loadSprite("marker_green.png")},
  //   'blue': {'normal': loadSprite("marker_blue.png")},
  //   'white': {'normal': loadSprite('marker_white.png')},
  //   'full': {'normal': loadSprite("basic_blimp_full.png"), 'reinforced': loadSprite("reinforced_blimp_full.png")},
  //   'hit1': {'normal': loadSprite("basic_blimp_hit.png"), 'reinforced': loadSprite("reinforced_blimp_hit1.png")},
  //   'hit2': {'normal': loadSprite("basic_blimp_hit2.png"), 'reinforced': loadSprite("reinforced_blimp_hit2.png")},
  //   'hit3': {'normal': loadSprite("basic_blimp_hit3.png"), 'reinforced': loadSprite("reinforced_blimp_hit3.png")},
  //   'hit4': {'normal': loadSprite("basic_blimp_hit4.png"), 'reinforced': loadSprite("reinforced_blimp_hit4.png")}
  // }



  sprites.balls = {
    'red': { 'lobber': loadSprite("ball_red.png"), 'boomerang': loadSprite("boomerang_red.png"), 'laser': loadSprite("laser_red.png") },
    'green': { 'lobber': loadSprite("ball_green.png"), 'boomerang': loadSprite("boomerang_green.png"), 'laser': loadSprite("laser_green.png") },
    'blue': { 'lobber': loadSprite("ball_blue.png"), 'boomerang': loadSprite("boomerang_blue.png"), 'laser': loadSprite("laser_blue.png") }

  }

  sprites.cannon_parts = {
    'barrel': { 'normal': loadSprite("cannon_barrel.png") },
    'red': { 'normal': loadSprite("cannon_red.png") },
    'green': { 'normal': loadSprite("cannon_green.png") },
    'blue': { 'normal': loadSprite("cannon_blue.png") }
  }

  sprites.barriers = {
    'barrier': { 'normal': loadSprite("barrier_wall.png") },
    'intense_barrier': { 'normal': loadSprite("barrier_wall_intense.png") }
  }

  sprites.extras = {
    'background': { 'normal': loadSprite("background.jpg"), 'shop': loadSprite("shop_background.png"), 'win': loadSprite("win_background.png")},
    'platform': { 'normal': loadSprite("platform.png") },
    'text_box': { 'normal': loadSprite("text_box.png") },
    'large_text_box': { 'normal': loadSprite("large_text_box.png") },
    'faster_balloons_button': { 'normal': loadSprite('faster_balloons_mode_button.png') },
    'armored_only_button': { 'normal': loadSprite("armored_only_mode_button.png") },
    'tutorial_mode_button': { 'normal': loadSprite("tutorial_mode_button.png") },
    'freeplay_mode_button': { 'normal': loadSprite("freeplay_mode_button.png") },
    'simple_button': { 'normal': loadSprite("simple_button.png") },
    'no_color_mode': { 'normal': loadSprite('no_color_mode_button.png') },
    'Easy_button': { 'normal': loadSprite("easy_mode_button.png") },
    'Normal_button': { 'normal': loadSprite('intermediate_mode_button.png') },
    'Hard_button': { 'normal': loadSprite("hard_mode_button.png") },
    'Apex_button': { 'normal': loadSprite("apex_mode_button.png") },
    'end_screen': { 'normal': loadSprite("blank_end_screen.png") },
    'arrow': { 'normal': loadSprite('arrow.png') },
    'color_button': { 'red': loadSprite('color_button_red.png'), 'green': loadSprite('color_button_green.png'), 'blue': loadSprite('color_button_blue.png') },
    'power_up_slot': { 'normal': loadSprite("power_up_slot.png") },
    'bomb_icon': { 'normal': loadSprite("bomb.png") },
    'snowflake': { 'normal': loadSprite("snowflake.png") },
    'shop_info_bar': { 'normal': loadSprite("shop_info_bar.png") },
    'doubleshot_upgrade_icon': { 'normal': loadSprite("double_ball_upgrade_icon.png") },
    'chargedshot_upgrade_icon': { 'normal': loadSprite("chargedshot_upgrade_icon.png") },
    'semi_upgrade_icon': { 'normal': loadSprite("semi_upgrade_icon.png") },
    'redhot_upgrade_icon': { 'normal': loadSprite("redhot_upgrade_icon.png") },
    'phase_upgrade_icon': { 'normal': loadSprite("phase_upgrade_icon.png") },
    'extraloopy_upgrade_icon': { 'normal': loadSprite("extraloopy_upgrade_icon.png") },
    'empty_icon': { 'normal': loadSprite('empty_icon.png') },
    'sold_sign': { 'normal': loadSprite("sold_sign.png") },
    'inventory': { 'normal': loadSprite("inventory_slots.png") },
    'coin': { 'normal': loadSprite('coin.png') },
  }

  sounds.playSound = loadSound("playSound_01", false)
  sounds.popEffect = loadSound("pop_effect", false)
  sounds.bump = loadSound("bump_sfx", false)
  sounds.boom = loadSound("boom_sfx", false);
  sounds.hitSound = loadSound("hit_sound", false)
  sounds.clang = loadSound("clang", false)
  sounds.backgroundMusicBasic = loadSound("color_pop_background_music_basic", true)
  sounds.extraLife = loadSound("extra_life", false);
  sounds.gameOver = loadSound("game_over_sound", false);
  sounds.cannonShot = loadSound("cannon_shot", false)
}

